#VUE基础知识
### vue基础语法

### ref 02-ref属性
1. 被用来给元素或者子组件注册引用信息 (id的替代者 document.getelementbyid)
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象
3. 使用方式:    
   标记: `<h1 ref="xxx">... ...</h1>`
   使用: `this.refs.xxx`

### prop 03-配置项prop
功能：让组件接收外部传入的数据
1. 传递数据
   `<Demo name="xxx"/>`
2. 接收数据
   方法1: 只接收  
   `props['name','xxx','xxx'....]`  
   方法2: 接收并且限制类型  
   `props{
   name: String,
   xxx: Number,
   }`  
   方法3: 接收并且限制类型、必填项、默认值   
   `
   props:{
   name:{
   type: String,   //数据类型  
   required: true, //名称必填  
   default: '默认值',
   },
   year:{
   type: Number,   //数据类型
   required: true, //名称必填
   default: 默认值,
   },
   `
>props为只读，vue底层会监测你对props的修改，如果发生了修改，会触发警告，如果需要修改，请复制一份prop的内容到data中，去修改data中的数据

### mixin 04-配置项mixin
功能： 让多个组件共用的配置提取出来形成一个混入对象
使用方法:
1. 定义混合
   ```javascript
      export const mixinmethods = {
         //可以是方法、数据、生命周期的钩子函数...
         methods: {
            showinfo(){
               alert(this.name)
            }
         },
         data(){
            return {
               x: 1,
               y: 2,
            }
         },
         mounted:{
            console.log('组件被挂载')
         }
      }   
   ```
2. 使用混合  
   A.局部混合 在组件中import
   ```javascript
      //引入混合的对象
      import {mixinmethods, minxin_xxx,...} from '../mixin'

      //加入组件
      mixins:[mixinmethods, minxin_xxx,...]
   ```
   B.全局混合
   ```javascript
      //引入混合的对象
      Vue.minin(mixinmethods)
      Vue.minin(mixin_xxx)
      Vue.minin(...)

      //在需要使用的组件中加入
      mixins:[mixinmethods, minxin_xxx,...]
   ```   

### plugins 05-插件配置项plugins
功能：用于增强Vue  
本质: 包含install方法的一个对象，install的第一个参数是Vue，随后的参数是插件使用者传递的数据，可以任意定义  
使用方法:
1. 定义插件
   ```javascript
      对象.install = function(Vue, 插件使用者需要的数据...)
      
      其中可以添加任意方法
      //1. 添加全局过滤器
      Vue.filter()

      //2. 添加全局指令
      Vue.directive()

      //3. 添加全局混入
      Vue.mixin()

      //4. 添加实例方法
      Vue.prototype.$myMethod = function(){...}
      Vue.prototype.$myProperty = xxx
   ```
2. 使用插件
   Vue.use(插件名)

### 自定义事件 09-自定义事件
功能：一种组件间通讯的方式，适用于子组件给父组件传递数据, 和Props刚好相反 子组件===>父组件
场景: A为父组件，B为子组件，B想要传输数据给A,就要再A中给B绑定自定义事件(事件的回调函数放在父组件中（A）)
绑定方法:
1. 第一种方式: 在父组件中 `<childcomponent @自定义事件名称="自定义事件回调函数" />`或者`<childcomponent v-on:自定义事件名称="自定义事件回调函数" />`
2. 第二种方式: 在父组件中
   ```javascript
      <childcomponent ref="组件ref名称"> 
      ... ... 
      mounted(){
         this.$refs.组件ref名称.$on(`自定义事件名`, this.自定义事件回调函数)
      }
   ```
触发方法: 在子组件中调用
   ```javascript 
      this.$emit('父组件中定义的自定义事件名', 需要传递给父组件的参数0 ... 需要传递给父组件的参数n) 
   ```
解绑自定义事件
1. 解绑一个指定自定义事件 `this.$off("自定义事件名")`
2. 解绑多个指定自定义事件 `this.$off(["自定义事件名1"],["自定义事件名2"])`
3. 解绑全部自定义事件`this.$off()`
>Ps. 1. 组件上也可以绑定原生DOM事件，使用native修饰符
2. 通过绑定方法二时，如果使用匿名回调函数，需要使用箭头函数，否则this指针的指向会出问题

### 自定义事件 11-全局总线事件
功能： 一种组件间通讯的方式，适用于任意组件间通讯
使用方法:
1. 安装全局事件总线
```javascript 
   new Vue({
      ...
      beforeCreate(){
         Vue.prototype.$bus = this;   //安装全局事件总线，$bus可以这可以随便定义，这里只是普遍使用$bus, 此处的this为VUE的实例化对象
      }
   })
```
2. 使用全局事件总线-接收者
   组件A想要接收数据，则在A组件中给$bus绑定自定义事件，事件的回调函数在A组件自身
   ```javascript
   methods(){
      自定义事件处理函数(数据){          //data为接收到的数据

      }
   }
   ...
   mounted(){
      this.$bus.$on('自定义事件名称', this.自定义事件处理函数) 
   }
   ```
3. 使用全局事件总线-数据提供者
   ```javascript
   this.$bus.$emit('自定义事件名称', 数据)
   ```
4. 最好在组件销毁处，移除总线中绑定的自定义事件
   ```javascript
   beforeDestory(){
      this.$bus.off('你想要移除的自定义事件名称')
   }
   ```

### 消息的订阅与发布
1. 一种组件间通讯的方式，适用于任意组件间通讯
2. 使用方法
    1. 安装pubsub: npm i pubsub-js
    2. 在使用的模块中引入: import pubsub from 'pubsub-js'
    3. 接收数据: A组件如果想要接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。
       ```javascript
         methods(){
            处理消息的回调函数(data){...}
         }
         mounted(){
            this.pubsubId = pubsub.subscribe('消息名', this.处理消息的回调函数()
         }
       ```
    4. 提供数据: pubsub.publish('消息名', 数据)
    5. 取消订阅
       ```javascript
       beforeDestory(){
          pubsub.unsubscribe(pubsubid)
       }
       ```
### vue-cli脚手架初始化
    node + webpack + 淘宝镜像  
    建立项目 `vue create 项目名称`  
### 项目说明
1. vue-cli项目目录
   ```text
    project  
        - node_moudles  项目依赖目录     
        - public        放置静态资源，在使用webpack进行打包的时候，会原封不动的放置到dist文件夹中
        - src           代码
        - assets        放置多个组件公用的静态资源，在使用webpack进行打包的时候，会把静态资源作为一个模块，打包到js文件中  
        - components    放置非路由组件或全局组件  
        - views/pages   放置路由组件
        - router        路由配置  
        App.vue         唯一的根组件, Vue中的组件全部以.vue作为扩展名  
        main.js         程序入口文件，项目中最先被执行的文件   
    babel.config.js     babel配置文件
    package.json        项目文件
    package-lock.json   缓存文件
    ```
2. 项目配置(package.json)
   2.1 项目运行时，自动打开浏览器
   ```json
        "scripts": {
        "serve": "vue-cli-service serve --open", 加入--open
        },
    ```
   2.2 关闭eslint校验功能，在根目录下创建vue.config.js文件
   ```javascript
        module.exports = {
            //关闭eslint
            "lintOnSave": false
        }
   ```   
   2.3 配置src目录的简写方式，在根目录下创建jsconfig.json文件，配置别名“@”作为目录简写字符，“@”等于src目录
   ```json
      {
        "compilerOptions": {
          "baseUrl": "./",
          "paths": {
            "@/*": ["src/*"]
                   }  
        },
        "exclude": ["node_modules", "dist"]     
      }  
    ``` 
3. 项目路由分析
4. 安装依赖组件  
   4.1 安装less和less-loader,必须安装版本5.0  
   `npm install --save less less-loader@5 `
   >如果组件识别less样式，必须在style标签上加上lang=less    
   `<style lang="less">`
5. 使用组件步骤
   5.1 局部组件  
   5.1.1 定义  
   5.1.2 引入    
   import 组件名 from '组件文件/目录'    
   ```javascript  
   import Headder from './components/Header'  
   ```  
   5.1.3 注册    
   components: {    
   组件名    
   }    
   ```javascript
   components: {
   Header
   }
   ```  
   5.1.4 使用
   <组件名></组件名>  
   ```javascript
   <Header></Header>
   ```  
   5.2 全局组件  
   5.2.1 定义
   5.2.2 引入    
   ```javascript
   import 组件名 from '组件目录'
   ```
   5.2.3 使用  
   ```javascript
   Vue.component(组件类型.name, 组件类型)
   ```
6. 路由搭建(vue-router)  
   6.1 安装   
   使用3.5.3版本，高版本的有问题  
   `npm install --save vue-router@3.5.3 `    
   6.2 配置路由  
   项目中配置的路由，一般放置在router目录中，配置文件为index.js, 具体配置，详见index.js  
   6.2.1 引入/注册路由
   在main.js中，引入路由  
   ```javascript
   //引入路由
   import router from '@/router'

            new Vue({
            render: h => h(App),
            //注册路由
            router: router,
            }).$mount('#app')
         ```
   6.2.2 使用路由出口
   在app.vue中，使用路由出口
      ```javascript
         <template>
           <div>
             <Header></Header>
             <!-- 路由组件出口的地方 -->
             <router-view></router-view>
             <Footer></Footer>
           </div>
         </template>
      ```
   6.3 路由跳转方式  
   6.3.1 声明式跳转 router-link
      ```javascript
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
      ```
   >声明式导航：必须要有to属性

   6.3.2 编程式跳转 使用push|replace进行跳转
      ```javascript 
      this.$router.push('/search')
      ```
   6.4 路由原信息(类似于路由自定义参数)  
   6.4.1 定义路由原信息
      ```javascript
       routes: [
           // 重定向规则,如果只输入网站名，定向到Home页面
           { 
               // 路由原信息，类似于路由自定义参数
               meta: { showFooter: true },
           }    
      ```
   6.4.2 使用路由原信息
      ```javascript
          <Footer v-if="$route.meta.showFooter == true"></Footer>
      ```
   6.5 路由传参  
   6.5.1：字符串方式
      ```javascript 
        this.$router.push('/search/' + this.keyWord + '?k=' + this.keyWord.toUpperCase())
      ```      
   6.5.2: 模板字符串方式,此处是"`"
      ```javascript 
        this.$router.push(`/search/${this.keyWord}?k=${this.keyWord.toUpperCase()}`) 
      ```
   6.5.3：对象方式
      ```javascript
        路由配置方式   
        {
           path: '/search/:keyword',
           component: Search,
           meta: { showFooter: true },
           name: 'search'
        }
        此处不写路径，而是使用在路由配置处定义的name字段的值
        this.$router.push({name:"search", params:{keyword:this.keyWord},query:{k:this.keyWord.toUpperCase()}})
      ```
   6.5.4 参数接收  
   a. 接收params方式的参数    
   ```javascript
   {{$route.params.keyword}}
   ```  
   b. 接收query方式参数  
   ```javascript    
   {{$route.query.k}}
   ```
   >Ps. 1. 如果路由中的para参数可能存在，也可能不存在， 需要在路由配置时，在占位符后面加个？
   ```javascript
       {
           path: '/search/:keyword？',       //此处？表示可能存在para参数，也可能不存在para参数
           component: Search,
           meta: { showFooter: true },
           name: 'search'
        }
   ```
       2. 如果para参数为一个空串，则传递undefine
   `this.$router.push({name:"search", params:{keyword:''||undefined},query:{k:this.keyWord.toUpperCase()}})`

   6.5.5 参数不变情况下，函数式跳转连续两次产生警告  
   原因：返回了一个promis对象，由于没有传入reject的处理函数，导致警告  
   处理：覆写默认的push|replace方法，根据条件调用原始的push|replace，当发现没有传递reject函数时，使用内部默认的reject函数，不输出警告。
      ```javascript
         let orginPush = VueRouter.prototype.push;
         let orginReplace = VueRouter.prototype.replace;

         VueRouter.prototype.push = function(location, resolve, reject){
           if (resolve && reject){
               orginPush.call(this, location, resolve, reject)
            } else {
               orginPush.call(this, location, ()=>{}, ()=>{})
            }
         }

      VueRouter.prototype.replace = function(location, resolve, reject){
         if (resolve && reject){
            orginReplace.call(this, location, resolve, reject)
         } else {
            orginReplace.call(this, location, ()=>{}, ()=>{})
         }
      }
7. VUE服务器代理配置  
   7.1 修改vue.config.js文件  
   7.2 ```javascript   
   devServer: {  
   proxy: {  
   '/api1': {     //配置所有以/api1开头的请求路径  
   target: 'http://localhost:5000', //代理目标的基础路径   
   changeOrigin: true, //设置请求头中的host为 代理服务器 localhost:5000  
   pathRewrite: {'^/api1': ''} //替换/api1为空  
   },  
   //例如 localhost:8080/api1/info => localhost:5000/info  
   '/api2': {     //配置所有以/api1开头的请求路径  
   target: 'http://localhost:5001', //代理目标的基础路径  
   changeOrigin: false, //设置请求头中的host为原始服务器 localhost:8080  
   pathRewrite: {'^/api1': 'test'} //替换/api2为test  
   }  
   //例如 localhost:8080/api1/info => localhost:5000/test/info  
   }
   }
   ```  
   7.3 可以配置多个代理，并且可以灵活的控制请求是否需要走代理路径  
     
## VUEX
1. 安装
   如果使用vue2.x,请使用npm install vuex@3.6.2, 因为vuex当前版本为4.x，不支持vue2.x
2. 准备
   2.1 src目录中创建store目录
   2.2 src目录中创建index.js
   ```javascript
      //引入vue
      import Vue from 'vue'
      //引入vuex
      import Vuex from 'vuex'

      //使用vuex插件
      Vue.use(Vuex)

      //actions对象, 用于响应组件中的动作
      const actions = {
         动作名1: function(context, value){
            context.commit('要执行的函数名1', value)
         },
         动作名2: function(context, value){
            context.commit('要执行的函数名2', value)
         }
      }

      //muations对象，用于操作数据
      const mutations = {
         要执行函数名1: function(state, value){
            
         },
         要执行函数名2: function(state, value){
            
         },
      }

      //state对象，存储数据
      const state = {
         数据1名称: 数据值1
         数据n名称: 数据值n
      }

      //getters,类似于计算属性
      const getters =  {
         输出计算值1(state){
            return 值;
         },
         输出计算值2(state){
            return 值;
         }
         输出计算值n(state){
            return 值;
         }
      }

      //创建vuex的核心store对象
      const store = new Vuex.Store({
         actions: actions,
         mutations: mutations,
         state: state,
      })

      //导出store对象
      export default store;
   ```  
3. 加载 main.js   
   3.1 引入vuex
   ```javascript
      //引入vuex
      import store from './store/index'
   ```
   3.2 使用
   ```javascript
      new Vue({
         store: store,     //此处导入vuex的store对象
      }).$mount('#app')
   ```
4. 调用   
   4.1 调用action
      ```javascript    
         this.$store.dispatch("store中定义在actions中的函数", 参数1， 参数2，... 参数n);
      ```    
   4.2 调用getter方法
      ```javascript 
         this.$store.getters.输出就算值
      ```
5. Vuex中map使用  
   5.1 引入
   ```javascript
      //引入vuex
      import Vuex from 'vuex'
   ```
   5.2 使用
   ```javascript
      //使用vuex
      Vue.use(Vuex)
   ```
   5.3 帮助我们映射action中的方法为事件
   ```javascript
      import { mapActions } from "vuex";
      //实现方法一： 对象写法
       ...mapActions({ method事件函数名1: "action函数名1", method事件函数名2: "action函数名2" }),
      //实现方法二： 数组写法
      ...mapActions(["inc", "dec"]),
   ```
   5.4 帮助我们映射state中的数据为`计算属性`, 适用mapGetters|mapState
   ```javascript
      import { mapGetters } from "vuex";

      computed: {
         //实现方法一 从state中读取数据，手工映射
         // company() {
         //   return this.$store.getters.company;
         // },
         // address() {
         //   return this.$store.getters.address;
         // },
         //实现方法二 从state中读取数据，对象写法
         //const maps = mapGetters({ company: "company" }, { address: "address" });
         //console.log(maps)
         //...mapGetters({ company: "company" }, { address: "address" }),
         //实现方法三 从state中读取数据，数组写法
         ...mapGetters(["company", "address"]),
      }
   ```   
6. 多模块使用  
   6.1 定义 store/index.js
   ```javascript  
      //定义模块一 命名空间必须要开启，虽然可以不开启，如果不开启，则全部函数全部在同一命名空间中
      const countOptions = {
         namespaced: true,
         actions:{
            inc: function(context, value){
                  context.commit('INC', value)
            },
            dec: function(context, value){
                  context.commit('DEC', value)
            },
         },
         mutations: {
            INC: function(state, value){
                  state.sum = state.sum + Number(value);
            },
            DEC: function(state, value){
                  state.sum = state.sum - Number(value);
            },
         },
         state: {
            sum: 0,
            companyName: '灵动微电子',
            companyAddr: '南京',        
         },
         getters: {
            sum410(state){
                  return state.sum * 10;
            },
            company(state){
                  return state.companyName;
            },
            address(state){
                  return state.companyAddr;
            },
         },
      }

      //定义模块二 命名空间必须要开启，虽然可以不开启，如果不开启，则全部函数全部在同一命名空间中
      const personOptions = {
         namespaced: true,       
         actions:{
            addPerson: function(context, value){
                  context.commit('ADDPERSON', value)
            }
         },
         mutations: {
            ADDPERSON: function(state, value){
                  state.personNames.push(value)
            },
         },
         state: {
            personNames: [],
         },
         getters: {
            personNames(state){
                  return state.personNames;
            },
         },
      }

      const store = new Vuex.Store({
         modules:{
            countOptions: countOptions,
            personOptions: personOptions,
         }
      })
   ```
   6.2 使用
   ```javascript
     //第一个参数模块名，第二个参数是里面对应的函数 
     computed: {
       ...mapGetters("countOptions", ["company", "address", "sum410"]),
       ...mapGetters("personOptions", ["personNames"]),
     },
     methods: {
       ...mapActions("countOptions", { dec: "dec", inc: "inc" }),
     //路径方式 模块名/函数名
       this.$store.dispatch("personOptions/addPerson", this.name);
     }
   ```
   6.3 模块方式应用
   6.3.1 定义 personOptions.js
      ```javascript  
         const personOptions = {
            namespaced: true,
            actions:{
               addPerson: function(context, value){
                     context.commit('ADDPERSON', value)
               }
            },
            mutations: {
               ADDPERSON: function(state, value){
                     state.personNames.push(value)
               },
            },
            state: {
               personNames: [],
            },
            getters: {
               personNames(state){
                     return state.personNames;
               },
            },
         }

         export default personOptions
      ```
   6.3.2 引入 index.js
      ```javascript
         import personOption from '.\personOptions'
      ```
   6.3.3 使用 index.js
      ```javascript  
         const store = new Vuex.Store({
            //模块写法
            modules:{
               personOptions: personOptions, //和正常写法一样
            }
         })
      ```
##插件
1. nprogress
   1.1 安装  
   `npm i --save nprogress`  
   1.2 使用  
   1.2.1 引入
      ```javascript  
         //引入插件
         import nprogress from 'nprogress'
         //引入样式, 如果需要修改样式，修改nprogress.css文件
         import "nprogress/nprogress.css";
      ```
   1.2.2 使用  
   在需要启动进度条的地方调用
      ```javascript
           // 进度条开始动作
           nprogress.start();
           ... ... 
           // 进度条结束动作
           nprogress.done();
      ```
2. lodash
   1.1 安装(node_moudle已经自带)
   1.2 使用  
   1.2.1 引入
   ```javascript
      import {throttle} from 'loadsh/throttle'
   ```
   1.2.2 使用
   ```javascript
   //一秒执行一次
    throttle(function(){
        console.log('throttle');
   }, 1000)   
   ```
## VITE配置
1. 变量覆盖范围
   .env.local文件中的变量，会覆盖.env中的变量，最终被作为配置装载

## ESLINT
1. 安装   
   ```
   npm install --save-dev eslint eslint-plugin-vue
   npm install -g eslint@7.1.0
   ```
   


##前端


##后端
