// main.js

// 1. 定义一个通用的新页面模板
const NewPageComponent = {
    template: `
        <div class="new-page-container">
            <header class="new-page-header">
                <i class="fas fa-arrow-left back-button" @click="$router.go(-1)"></i>
                <h1 class="new-page-title">{{ $route.meta.title }}</h1>
            </header>
            <main class="new-page-content">
                <!-- 这里是页面的具体内容，暂时留空 -->
            </main>
        </div>
    `
};

// 2. 定义主页组件
const HomeComponent = { template: '<h1>欢迎来到 felotus</h1><p>简约，是一种态度。</p>' };

// 3. 定义路由规则
const routes = [
    { path: '/', component: HomeComponent, meta: { title: '首页' } },
    { path: '/personalization', component: NewPageComponent, meta: { title: '个性化' } },
    { path: '/roles', component: NewPageComponent, meta: { title: '角色' } },
    { path: '/api', component: NewPageComponent, meta: { title: 'API' } },
    { path: '/search', component: NewPageComponent, meta: { title: '搜索服务' } },
    { path: '/voice', component: NewPageComponent, meta: { title: '语音服务' } },
    { path: '/regex', component: NewPageComponent, meta: { title: '正则' } },
    { path: '/shortcuts', component: NewPageComponent, meta: { title: '快捷键' } },
    { path: '/data', component: NewPageComponent, meta: { title: '数据管理' } },
    { path: '/report', component: NewPageComponent, meta: { title: '年度报告' } },
    { path: '/global-search', component: NewPageComponent, meta: { title: '全局搜索' } },
    { path: '/add-character', component: NewPageComponent, meta: { title: '添加角色' } },
    { path: '/anniversary', component: NewPageComponent, meta: { title: '纪念日' } },
    { path: '/favorites', component: NewPageComponent, meta: { title: '收藏' } },
    { path: '/inbox', component: NewPageComponent, meta: { title: '收件箱' } },
    { path: '/announcements', component: NewPageComponent, meta: { title: '公告' } },
    { path: '/help', component: NewPageComponent, meta: { title: '帮助' } },
    { path: '/profile', component: NewPageComponent, meta: { title: '编辑资料' } },
    { path: '/sidebar', name: 'sidebar' },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

// 4. 创建路由实例
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
});

// 5. 创建 Vue 应用实例
const app = Vue.createApp({
    data() {
        return {
            touchStartX: 0,
            touchStartY: 0,
            // !!! 新增：用于控制侧边栏动画的标志 !!!
            isNavigatingBackToSidebar: false
        }
    },
    computed: {
        isSidebarVisible() {
            return this.$route.name === 'sidebar';
        }
    },
    methods: {
        openSidebar() {
            if (!this.isSidebarVisible) {
                this.$router.push({ name: 'sidebar' });
            }
        },
        closeSidebar() {
            if (this.isSidebarVisible) {
                this.$router.back();
            }
        },
        handleTouchStart(event) {
            this.touchStartX = event.touches[0].clientX;
            this.touchStartY = event.touches[0].clientY;
        },
        handleTouchMove(event) {
            const deltaX = event.touches[0].clientX - this.touchStartX;
            const deltaY = Math.abs(event.touches[0].clientY - this.touchStartY);
            if (deltaX < -10 && Math.abs(deltaX) > deltaY) {
                event.preventDefault();
            }
        },
        handleTouchEnd(event) {
            const touchEndX = event.changedTouches[0].clientX;
            const swipeDistance = this.touchStartX - touchEndX;
            if (swipeDistance > 50) {
                this.closeSidebar();
            }
            this.touchStartX = 0;
            this.touchStartY = 0;
        },
        handleMainTouchStart(event) {
            this.touchStartX = event.touches[0].clientX;
            this.touchStartY = event.touches[0].clientY;
        },
        handleMainTouchMove(event) {
            if (this.touchStartX === 0) return; 
            const deltaX = event.touches[0].clientX - this.touchStartX;
            const deltaY = Math.abs(event.touches[0].clientY - this.touchStartY);
            if (deltaX > 10 && deltaX > deltaY) {
                event.preventDefault();
            }
        },
        handleMainTouchEnd(event) {
            if (this.touchStartX === 0) return;
            const touchEndX = event.changedTouches[0].clientX;
            const swipeDistance = touchEndX - this.touchStartX;
            if (swipeDistance > 50) {
                this.openSidebar();
            }
            this.touchStartX = 0;
            this.touchStartY = 0;
        }
    }
});

// !!! 新增：全局导航守卫 !!!
router.beforeEach((to, from) => {
    // ._instance 是 Vue 内部的属性，这里我们用来访问根组件的 data
    const rootVm = router.app._instance.data;

    // 判断条件：
    // 1. 我们要去的页面是侧边栏 (to.name === 'sidebar')
    // 2. 我们不是从主页 `/` 过来的 (from.path !== '/')
    //    (这意味着我们是从 /personalization, /roles 等页面返回)
    if (to.name === 'sidebar' && from.path !== '/') {
        // 如果是，设置标志为 true，禁用动画
        rootVm.isNavigatingBackToSidebar = true;
    } else {
        // 否则，设置标志为 false，启用动画
        rootVm.isNavigatingBackToSidebar = false;
    }
});


// 6. 告诉 Vue 应用要使用我们创建的路由
app.use(router);

// 7. 挂载应用
// 挂载后，我们才能在 router.beforeEach 中通过 router.app 访问到 Vue 实例
app.mount('#app');