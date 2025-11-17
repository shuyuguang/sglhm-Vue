// main.js

// 1. 定义所有页面组件
// 为了方便，我们先用简单的模板占位
const HomeComponent = { template: '<h1>欢迎来到 felotus</h1><p>简约，是一种态度。</p>' };
const PersonalizationComponent = { template: '<h1>个性化设置</h1><p>在这里调整你的主题和外观。</p>' };
const RolesComponent = { template: '<h1>角色管理</h1><p>在这里创建和管理你的角色。</p>' };
const ApiComponent = { template: '<h1>API</h1><p>API 相关文档和设置。</p>' };
const RegexComponent = { template: '<h1>正则</h1><p>正则表达式工具和测试。</p>' };
const ShortcutsComponent = { template: '<h1>快捷键</h1><p>查看和自定义快捷键。</p>' };
const DataComponent = { template: '<h1>数据管理</h1><p>管理你的应用数据。</p>' };
const ReportComponent = { template: '<h1>年度报告</h1><p>查看你的年度使用报告。</p>' };

// !!! 新增的组件在这里 !!!
const AddCharacterComponent = { template: '<h1>添加角色</h1><p>在这里创建一个新的角色。</p>' };
const SearchServiceComponent = { template: '<h1>搜索服务</h1><p>在这里使用全局搜索服务。</p>' };
const VoiceServiceComponent = { template: '<h1>语音服务</h1><p>在这里使用语音识别和合成服务。</p>' };
const AnniversaryComponent = { template: '<h1>纪念日</h1><p>查看所有重要的纪念日。</p>' };
const FavoritesComponent = { template: '<h1>收藏</h1><p>你的收藏夹。</p>' };
const MailComponent = { template: '<h1>邮件</h1><p>你的收件箱。</p>' };
const AnnouncementsComponent = { template: '<h1>公告</h1><p>查看最新的公告信息。</p>' };
const HelpComponent = { template: '<h1>帮助</h1><p>需要帮助吗？在这里找到答案。</p>' };
const EditProfileComponent = { template: '<h1>编辑个人资料</h1><p>在这里更新你的头像、昵称等信息。</p>' };


// 2. 定义路由规则
const routes = [
    { path: '/', component: HomeComponent },
    { path: '/personalization', component: PersonalizationComponent },
    { path: '/roles', component: RolesComponent },
    { path: '/api', component: ApiComponent },
    { path: '/regex', component: RegexComponent },
    { path: '/shortcuts', component: ShortcutsComponent },
    { path: '/data', component: DataComponent },
    { path: '/report', component: ReportComponent },
    
    // !!! 新增的路由规则在这里 !!!
    { path: '/add-character', component: AddCharacterComponent },
    { path: '/search-service', component: SearchServiceComponent },
    { path: '/voice-service', component: VoiceServiceComponent },
    { path: '/anniversary', component: AnniversaryComponent },
    { path: '/favorites', component: FavoritesComponent },
    { path: '/mail', component: MailComponent },
    { path: '/announcements', component: AnnouncementsComponent },
    { path: '/help', component: HelpComponent },
    { path: '/edit-profile', component: EditProfileComponent },

    // 捕获所有未匹配的路由，可以重定向到首页
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

// 3. 创建路由实例
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

// 4. 创建 Vue 应用实例
// 这里的 data 和 methods 保持不变，它们负责侧边栏的开关和手势滑动
const app = Vue.createApp({
    data() {
        return {
            isSidebarOpen: false,
            touchStartX: 0,
            touchStartY: 0,
        }
    },
    methods: {
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

// 5. 使用路由
app.use(router);

// 6. 挂载应用
app.mount('#app');