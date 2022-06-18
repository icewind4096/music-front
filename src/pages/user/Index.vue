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
    const pageInfo = reactive({
        page: 1,
        limit: 5,
        search: {},
    })

    const columns = [
      { name: 'id',       field: 'id',       align: 'center', label: '序号',  style: 'width: 50px'},
      { name: 'userName', field: 'userName', align: 'center', label: '用户名',style: 'width: 50px'},
      { name: 'nickName', field: 'nickName', align: 'center', label: '昵称',  style: 'width: 50px'},
    ];

    const rows = ref([
    ])

    const pagination = ref({
      page: 2,
      rowsPerPage: 10
    })

    const fetchData = () => {
      pageList(pageInfo.page, pageInfo.limit, {}).then(response =>{
        console.log(response.data.data)
        rows.value = response.data.data.rows
        pagination.value.page = pageInfo.page;
        pagination.value.rowsPerPage = pageInfo.limit;
        pagination.value.rowsNumber = response.data.data.total;
      })
    }

    fetchData();

    return {
      pagination,
      rows,
      columns,
      pagesNumber: computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage)),
      // fetchData,
      // fetchData() {
      //   teacherApi.pageList(this.page, this.limit, this.searchObj).then(response => {
      //     this.list = response.data.rows
      //     this.total = response.data.total
      //   })
      // },
    }
  },
}
</script>

<style scoped>

</style>
