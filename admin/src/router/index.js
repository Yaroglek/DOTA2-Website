import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: Login,
  meta: {
    isPublic: true
  }
}, {
  path: '/',
  name: 'main',
  component: Main,
  children: [{
    path: '/categories/create',
    name: 'category_edit',
    component: CategoryEdit
  }, {
    path: '/categories/edit/:id',
    name: 'category_edit',
    component: CategoryEdit,
    props: true
  }, {
    path: '/categories/list',
    name: 'category_list',
    component: CategoryList
  }, {
    path: '/items/create',
    name: 'item_edit',
    component: ItemEdit
  }, {
    path: '/items/edit/:id',
    name: 'item_edit',
    component: ItemEdit,
    props: true
  }, {
    path: '/items/list',
    name: 'item_list',
    component: ItemList
  }, {
    path: '/heroes/create',
    name: 'hero_edit',
    component: HeroEdit
  }, {
    path: '/heroes/edit/:id',
    name: 'hero_edit',
    component: HeroEdit,
    props: true
  }, {
    path: '/heroes/list',
    name: 'hero_list',
    component: HeroList
  }, {
    path: '/ads/create',
    name: 'ad_edit',
    component: AdEdit
  }, {
    path: '/ads/edit/:id',
    name: 'ad_edit',
    component: AdEdit,
    props: true
  }, {
    path: '/ads/list',
    name: 'ad_list',
    component: AdList
  }, {
    path: '/articles/create',
    name: 'article_edit',
    component: ArticleEdit
  }, {
    path: '/articles/edit/:id',
    name: 'article_edit',
    component: ArticleEdit,
    props: true
  }, {
    path: '/articles/list',
    name: 'article_list',
    component: ArticleList
  }, {
    path: '/admin_users/create',
    name: 'admin_user_edit',
    component: AdminUserEdit
  }, {
    path: '/admin_users/edit/:id',
    name: 'admin_user_edit',
    component: AdminUserEdit,
    props: true
  }, {
    path: '/admin_users/list',
    name: 'admin_user_list',
    component: AdminUserList
  }]
}]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  !to.meta.isPublic && !sessionStorage.getItem('token')
    ? next('/login')
    : next()
})

export default router
