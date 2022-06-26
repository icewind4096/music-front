<template>
  <div class="page">
    <div class="q-mt-md q-mb-md">
      <q-btn color="primary" label="添加用户" />
    </div>

    <q-table
        title="用户管理"
        :rows="rows"
        :columns="columns"
        row-key="id"
    />

    <div class="row justify-center q-mt-md">
      <q-pagination
          v-model="pagination.page"
          color="grey-8"
          :max="pagesNumber"
          size="sm"
      />
    </div>
  </div>
</template>

<script>
import {computed, ref, reactive} from "vue";
import {pageList} from "../../api/user.js";

export default {
  name: "Index",
  setup() {
    const columns = [
      { name: 'id',       field: 'id',       align: 'center', label: '序号',  style: 'width: 50px'},
      { name: 'userName', field: 'userName', align: 'center', label: '用户名',style: 'width: 50px'},
      { name: 'nickName', field: 'nickName', align: 'center', label: '昵称',  style: 'width: 50px'},
    ];

    const pageInfo = reactive({
        page: 1,
        limit: 5,
        search: {},
    })

    const rows = ref([
    ])

    const pagination = reactive({
      page: 2,
      rowsPerPage: 10,
      rowsNumber: 0,
    })

    const fetchData = () => {
      pageList(pageInfo.page, pageInfo.limit, {}).then(response =>{
        rows.value = response.data.rows
        pagination.page = pageInfo.page;
        pagination.rowsPerPage = pageInfo.limit;
        pagination.rowsNumber = response.data.total;
      })
    }

    fetchData();

    return {
      pageInfo,
      pagination,
      rows,
      columns,
      pagesNumber: computed(() => Math.ceil(rows.length / pagination.rowsPerPage)),
      fetchData,
    }
  },
}
</script>

<style scoped>

</style>
