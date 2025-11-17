// main.js

// 1. 定义一些简单的页面组件
// 在真实项目中，这些模板会更复杂，甚至会是单独的文件
const HomeComponent = { template: '<h1>欢迎来到 felotus</h1><p>简约，是一种态度。</p>' };
const PersonalizationComponent = { template: '<h1>个性化设置</h1><p>在这里调整你的主题和外观。</p>' };
const RolesComponent = { template: '<h1>角色管理</h1><p>在这里创建和管理你的角色。</p>' };
// ...你可以为每个链接都创建一个组件

// 2. 定义路由规则
// 每个路由规则都是一个对象，包含 path (路径) 和 component (要显示的组件)
const routes = [
    { path: '/', component: HomeComponent },
    { path: '/personalization', component: PersonalizationComponent },
    { path: '/roles', component: RolesComponent },
    // 为了演示，其他链接都指向首页
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

// 3. 创建路由实例
const router = VueRouter.createRouter({
    // 使用 hash 模式，URL 中会有 #，对静态部署最友好
    history: VueRouter.createWebHashHistory(),
    routes, // routes: routes 的缩写
});

// 4. 创建 Vue 应用实例
const app = Vue.createApp({
    data() {
        return {
            isSidebarOpen: false,
            touchStartX: 0,
            touchStartY: 0,
        }
    },
    methods: {
        // toggleSidebar 和触摸事件处理函数保持不变
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
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
    }
});

// 5. 告诉 Vue 应用要使用我们创建的路由
app.use(router);

// 6. 挂载应用
app.mount('#app');