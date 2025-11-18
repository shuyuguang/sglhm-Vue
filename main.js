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

    // !!! 新增的侧边栏路由 !!!
    // 这个路由没有 component，因为它不渲染到 <router-view>
    // 它的作用仅仅是作为一个状态，告诉我们应该显示侧边栏
    { path: '/sidebar', name: 'sidebar' },

    // 捕获所有未匹配的路由，重定向到首页
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
            // 我们不再需要 isSidebarOpen 这个变量了！
            touchStartX: 0,
            touchStartY: 0,
        }
    },
    computed: {
        // !!! 新增的计算属性 !!!
        // 通过判断当前路由的名称是否为 'sidebar' 来决定侧边栏是否显示
        // 这是新的“单一数据源”
        isSidebarVisible() {
            return this.$route.name === 'sidebar';
        }
    },
    methods: {
        // !!! 重写方法 !!!
        openSidebar() {
            // 如果侧边栏还没打开，就跳转到 /sidebar 路由
            if (!this.isSidebarVisible) {
                this.$router.push({ name: 'sidebar' });
            }
        },
        closeSidebar() {
            // 如果侧边栏是打开的，就返回上一个路由
            if (this.isSidebarVisible) {
                this.$router.back();
            }
        },
        
        // --- 触摸事件处理函数更新 ---
        handleTouchStart(event) {
            this.touchStartX = event.touches[0].clientX;
            this.touchStartY = event.touches[0].clientY;
        },
        handleTouchMove(event) {
            const deltaX = event.touches[0].clientX - this.touchStartX;
            const deltaY = Math.abs(event.touches[0].clientY - this.touchStartY);
            // 在侧边栏上，只响应向左的滑动
            if (deltaX < -10 && Math.abs(deltaX) > deltaY) {
                event.preventDefault();
            }
        },
        handleTouchEnd(event) {
            const touchEndX = event.changedTouches[0].clientX;
            const swipeDistance = this.touchStartX - touchEndX;
            // 如果向左滑动超过50像素，就关闭侧边栏
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
            // 在主内容区，只响应向右的滑动
            if (deltaX > 10 && deltaX > deltaY) {
                event.preventDefault();
            }
        },
        handleMainTouchEnd(event) {
            if (this.touchStartX === 0) return;
            const touchEndX = event.changedTouches[0].clientX;
            const swipeDistance = touchEndX - this.touchStartX;
            // 如果向右滑动超过50像素，就打开侧边栏
            if (swipeDistance > 50) {
                this.openSidebar();
            }
            this.touchStartX = 0;
            this.touchStartY = 0;
        }
    },
    // 我们不再需要 watch 路由了，因为点击侧边栏里的链接
    // 会自动改变路由，isSidebarVisible 计算属性会变为 false，侧边栏自动关闭
});

// 6. 告诉 Vue 应用要使用我们创建的路由
app.use(router);

// 7. 挂载应用
app.mount('#app');