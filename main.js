// main.js

// 1. 定义一个通用的新页面模板
// $route.meta.title 会从下面的路由规则中获取页面标题
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
// 我们为每个链接都创建一个路由，并使用 meta 字段来存储页面标题
const routes = [
    // 基础页面
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

    // !!! 新增的路由规则 !!!
    // 顶栏图标
    { path: '/global-search', component: NewPageComponent, meta: { title: '全局搜索' } },
    { path: '/add-character', component: NewPageComponent, meta: { title: '添加角色' } },
    
    // 侧边栏顶部图标
    { path: '/anniversary', component: NewPageComponent, meta: { title: '纪念日' } },
    { path: '/favorites', component: NewPageComponent, meta: { title: '收藏' } },
    { path: '/inbox', component: NewPageComponent, meta: { title: '收件箱' } },
    { path: '/announcements', component: NewPageComponent, meta: { title: '公告' } },
    { path: '/help', component: NewPageComponent, meta: { title: '帮助' } },
    
    // 侧边栏用户区
    { path: '/profile', component: NewPageComponent, meta: { title: '编辑资料' } },

    // 捕获所有未匹配的路由，重定向到首页
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

// 4. 创建路由实例
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(), // 使用 hash 模式，对静态部署最友好
    routes,
    // 每次路由切换后，都滚动到页面顶部
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
});

// 5. 创建 Vue 应用实例
const app = Vue.createApp({
    data() {
        return {
            isSidebarOpen: false,
            touchStartX: 0,
            touchStartY: 0,
        }
    },
    methods: {
        // 点击链接后自动关闭侧边栏
        closeSidebar() {
            this.isSidebarOpen = false;
        },
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        // ... 其他触摸事件处理函数保持不变
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
            if (swipeDistance > 50 && this.isSidebarOpen) {
                this.isSidebarOpen = false;
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
            if (swipeDistance > 50 && !this.isSidebarOpen) {
                this.isSidebarOpen = true;
            }
            this.touchStartX = 0;
            this.touchStartY = 0;
        }
    },
    watch: {
        // 监听路由变化，如果侧边栏是打开的，就关闭它
        '$route'() {
            if (this.isSidebarOpen) {
                this.closeSidebar();
            }
        }
    }
});

// 6. 告诉 Vue 应用要使用我们创建的路由
app.use(router);

// 7. 挂载应用
app.mount('#app');