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

// !!! 新增：独立的侧边栏页面组件 !!!
// 它拥有自己的、完整的页面结构
const SidebarComponent = {
    template: `
        <div class="new-page-container">
            <header class="new-page-header">
                <i class="fas fa-arrow-left back-button" @click="$router.push('/')"></i>
                <h1 class="new-page-title">{{ $route.meta.title }}</h1>
            </header>
            <!-- 可滚动区域 -->
            <div class="sidebar-scroll-container">
                <!-- 顶部六个图标 -->
                <div class="sidebar-top-actions">
                    <router-link to="/anniversary" class="action-item"><i class="icon fas fa-calendar-day"></i></router-link>
                    <router-link to="/favorites" class="action-item"><i class="icon fas fa-star"></i></router-link>
                    <router-link to="/inbox" class="action-item"><i class="icon fas fa-envelope"></i></router-link>
                    <router-link to="/announcements" class="action-item"><i class="icon fas fa-bullhorn"></i></router-link>
                    <router-link to="/help" class="action-item"><i class="icon fas fa-question-circle"></i></router-link>
                    <!-- 这里的关闭按钮现在变成了“设置”图标 -->
                    <router-link to="/settings" class="action-item"><i class="icon fas fa-cog"></i></router-link>
                </div>

                <!-- 用户区 -->
                <div class="sidebar-user-area">
                    <img src="https://i.postimg.cc/Yq19VCkN/afelotus.jpg" alt="avatar" class="sidebar-avatar">
                    <div class="user-info">
                        <div class="sidebar-name">felotus</div>
                        <div class="sidebar-email">your.email@example.com</div>
                    </div>
                    <router-link to="/profile"><i class="icon fas fa-pen edit-profile-icon"></i></router-link>
                </div>

                <!-- 内容区 -->
                <nav class="sidebar-content-area nav-list">
                    <ul>
                        <li><router-link to="/personalization"><i class="nav-icon fas fa-palette fa-fw"></i><span>个性化</span></router-link></li>
                        <li><router-link to="/roles"><i class="nav-icon fas fa-user-tag fa-fw"></i><span>角色</span></router-link></li>
                    </ul>
                    <hr>
                    <ul>
                        <li><router-link to="/api"><i class="nav-icon fas fa-plug fa-fw"></i><span>API</span></router-link></li>
                        <li><router-link to="/search"><i class="nav-icon fas fa-globe fa-fw"></i><span>搜索服务</span></router-link></li>
                        <li><router-link to="/voice"><i class="nav-icon fas fa-play-circle fa-fw"></i><span>语音服务</span></router-link></li>
                        <li><router-link to="/regex"><i class="nav-icon fas fa-file-code fa-fw"></i><span>正则</span></router-link></li>
                        <li><router-link to="/shortcuts"><i class="nav-icon fas fa-bolt fa-fw"></i><span>快捷键</span></router-link></li>
                    </ul>
                    <hr>
                    <ul>
                        <li><router-link to="/data"><i class="nav-icon fas fa-database fa-fw"></i><span>数据管理</span></router-link></li>
                        <li><router-link to="/report"><i class="nav-icon fas fa-chart-pie fa-fw"></i><span>年度报告</span></router-link></li>
                    </ul>
                </nav>
            </div>
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
    { path: '/settings', component: NewPageComponent, meta: { title: '设置' } },
    
    // 侧边栏用户区
    { path: '/profile', component: NewPageComponent, meta: { title: '编辑资料' } },

    // !!! 新增的侧边栏页面路由 !!!
    { path: '/sidebar', component: SidebarComponent, meta: { title: '菜单与设置' } },

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
// !!! 注意：这里已经移除了所有和侧边栏状态、触摸事件相关的数据和方法 !!!
const app = Vue.createApp({});

// 6. 告诉 Vue 应用要使用我们创建的路由
app.use(router);

// 7. 挂载应用
app.mount('#app');