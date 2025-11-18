// main.js

// 1. 定义一个通用的新页面模板 (保持不变)
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

// 2. 定义主页组件 (保持不变)
const HomeComponent = { template: '<h1>欢迎来到 felotus</h1><p>简约，是一种态度。</p>' };

// 3. 定义路由规则
const routes = [
    // 基础页面
    { path: '/', component: HomeComponent, meta: { title: '首页' } },
    // !!! 新增的侧边栏路由，它没有 component，因为它只是一个“状态” !!!
    { path: '/sidebar', name: 'sidebar' }, 
    
    // 其他页面路由保持不变
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
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

// 4. 创建路由实例 (保持不变)
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
            // !!! 移除了 isSidebarOpen !!!
            touchStartX: 0,
            touchStartY: 0,
        }
    },
    // !!! 新增 computed 计算属性 !!!
    computed: {
        // 这个计算属性会实时告诉我们，当前路由是不是 '/sidebar'
        isSidebarRouteActive() {
            return this.$route.path === '/sidebar';
        }
    },
    methods: {
        // !!! 移除了 toggleSidebar 和 closeSidebar !!!

        // 侧边栏的触摸事件处理
        handleTouchStart(event) {
            this.touchStartX = event.touches[0].clientX;
            this.touchStartY = event.touches[0].clientY;
        },
        handleTouchMove(event) {
            // 这个逻辑可以简化，因为主要判断在 touchEnd
            if (!this.isSidebarRouteActive) return;
            const deltaX = event.touches[0].clientX - this.touchStartX;
            const deltaY = Math.abs(event.touches[0].clientY - this.touchStartY);
            if (deltaX < -10 && Math.abs(deltaX) > deltaY) {
                event.preventDefault();
            }
        },
        handleTouchEnd(event) {
            // 如果侧边栏是打开的，并且向左滑动，则返回上一页
            if (!this.isSidebarRouteActive) return;
            const touchEndX = event.changedTouches[0].clientX;
            const swipeDistance = this.touchStartX - touchEndX;
            if (swipeDistance > 50) {
                this.$router.back(); // !!! 核心修改：执行路由返回 !!!
            }
            this.touchStartX = 0;
            this.touchStartY = 0;
        },

        // 主内容区域的触摸事件处理
        handleMainTouchStart(event) {
            this.touchStartX = event.touches[0].clientX;
            this.touchStartY = event.touches[0].clientY;
        },
        handleMainTouchMove(event) {
            if (this.isSidebarRouteActive) return;
            const deltaX = event.touches[0].clientX - this.touchStartX;
            const deltaY = Math.abs(event.touches[0].clientY - this.touchStartY);
            if (deltaX > 10 && deltaX > deltaY) {
                event.preventDefault();
            }
        },
        handleMainTouchEnd(event) {
            // 如果侧边栏是关闭的，并且向右滑动，则导航到 /sidebar
            if (this.isSidebarRouteActive) return;
            const touchEndX = event.changedTouches[0].clientX;
            const swipeDistance = touchEndX - this.touchStartX;
            if (swipeDistance > 50) {
                this.$router.push('/sidebar'); // !!! 核心修改：导航到侧边栏路由 !!!
            }
            this.touchStartX = 0;
            this.touchStartY = 0;
        }
    },
    // !!! 移除了 watch 监听器，因为不再需要了 !!!
});

// 6. 告诉 Vue 应用要使用我们创建的路由 (保持不变)
app.use(router);

// 7. 挂载应用 (保持不变)
app.mount('#app');