
// وظائف مزامنة التقويم مع هوتميل وجيميل
class CalendarSync {
    // تهيئة التكامل مع هوتميل
    static initOutlookIntegration() {
        // في الواقع، هذا يتطلب تفعيل Outlook API
        // هنا سنقوم بمحاكاة العملية فقط
        
        return new Promise((resolve) => {
            // محاكاة عملية التهيئة
            setTimeout(() => {
                const isConnected = localStorage.getItem('outlookConnected') === 'true';
                resolve({
                    connected: isConnected,
                    account: isConnected ? localStorage.getItem('outlookAccount') : null
                });
            }, 1000);
        });
    }
    
    // تهيئة التكامل مع جيميل
    static initGmailIntegration() {
        // في الواقع، هذا يتطلب تفعيل Google Calendar API
        // هنا سنقوم بمحاكاة العملية فقط
        
        return new Promise((resolve) => {
            // محاكاة عملية التهيئة
            setTimeout(() => {
                const isConnected = localStorage.getItem('gmailConnected') === 'true';
                resolve({
                    connected: isConnected,
                    account: isConnected ? localStorage.getItem('gmailAccount') : null
                });
            }, 1000);
        });
    }
    
    // الاتصال بحساب هوتميل
    static connectOutlook() {
        return new Promise((resolve, reject) => {
            // في الواقع، هذا يتطلب تفعيل Outlook API
            // هنا سنقوم بمحاكاة العملية فقط
            
            // محاكاة نافذة تسجيل الدخول
            const email = prompt('الرجاء إدخال بريد هوتميل الخاص بك:');
            
            if (email && email.includes('@outlook.com') || email.includes('@hotmail.com')) {
                // محاكاة عملية المصادقة
                setTimeout(() => {
                    localStorage.setItem('outlookConnected', 'true');
                    localStorage.setItem('outlookAccount', email);
                    resolve({
                        success: true,
                        account: email
                    });
                }, 2000);
            } else {
                reject(new Error('البريد الإلكتروني غير صالح. الرجاء استخدام بريد هوتميل أو hotmail.'));
            }
        });
    }
    
    // الاتصال بحساب جيميل
    static connectGmail() {
        return new Promise((resolve, reject) => {
            // في الواقع، هذا يتطلب تفعيل Google Calendar API
            // هنا سنقوم بمحاكاة العملية فقط
            
            // محاكاة نافذة تسجيل الدخول
            const email = prompt('الرجاء إدخال بريد جيميل الخاص بك:');
            
            if (email && email.includes('@gmail.com')) {
                // محاكاة عملية المصادقة
                setTimeout(() => {
                    localStorage.setItem('gmailConnected', 'true');
                    localStorage.setItem('gmailAccount', email);
                    resolve({
                        success: true,
                        account: email
                    });
                }, 2000);
            } else {
                reject(new Error('البريد الإلكتروني غير صالح. الرجاء استخدام بريد جيميل.'));
            }
        });
    }
    
    // مزامنة الأحداث مع هوتميل
    static syncWithOutlook(events) {
        return new Promise((resolve) => {
            // في الواقع، هذا يتطلب تفعيل Outlook API
            // هنا سنقوم بمحاكاة العملية فقط
            
            // محاكاة عملية المزامنة
            setTimeout(() => {
                localStorage.setItem('lastOutlookSync', new Date().toISOString());
                resolve({
                    success: true,
                    syncedEvents: events.length,
                    lastSync: new Date().toISOString()
                });
            }, 3000);
        });
    }
    
    // مزامنة الأحداث مع جيميل
    static syncWithGmail(events) {
        return new Promise((resolve) => {
            // في الواقع، هذا يتطلب تفعيل Google Calendar API
            // هنا سنقوم بمحاكاة العملية فقط
            
            // محاكاة عملية المزامنة
            setTimeout(() => {
                localStorage.setItem('lastGmailSync', new Date().toISOString());
                resolve({
                    success: true,
                    syncedEvents: events.length,
                    lastSync: new Date().toISOString()
                });
            }, 3000);
        });
    }
    
    // جلب الأحداث من هوتميل
    static fetchOutlookEvents() {
        return new Promise((resolve) => {
            // في الواقع، هذا يتطلب تفعيل Outlook API
            // هنا سنقوم بمحاكاة العملية فقط
            
            // محاكاة جلب الأحداث
            setTimeout(() => {
                const mockEvents = [
                    {
                        id: 'outlook-1',
                        title: 'اجتماع فريق العمل',
                        start: new Date(Date.now() + 86400000).toISOString(),
                        end: new Date(Date.now() + 86400000 + 3600000).toISOString(),
                        color: '#1a237e',
                        extendedProps: {
                            type: 'outlook',
                            description: 'اجتماع لمناقشة تقدم المشروع'
                        }
                    }
                ];
                
                resolve(mockEvents);
            }, 2000);
        });
    }
    
    // جلب الأحداث من جيميل
    static fetchGmailEvents() {
        return new Promise((resolve) => {
            // في الواقع، هذا يتطلب تفعيل Google Calendar API
            // هنا سنقوم بمحاكاة العملية فقط
            
            // محاكاة جلب الأحداث
            setTimeout(() => {
                const mockEvents = [
                    {
                        id: 'gmail-1',
                        title: 'مكالمة مع العميل',
                        start: new Date(Date.now() + 2 * 86400000).toISOString(),
                        end: new Date(Date.now() + 2 * 86400000 + 1800000).toISOString(),
                        color: '#28a745',
                        extendedProps: {
                            type: 'gmail',
                            description: 'مكالمة لمناقشة متطلبات العميل'
                        }
                    }
                ];
                
                resolve(mockEvents);
            }, 2000);
        });
    }
}

// تصدير الدوال للاستخدام في الملفات الأخرى
window.CalendarSync = CalendarSync;

الجزء 3: تحديث ملف app.js

// تحديث ملف app.js لإضافة وظائف الأجندة والمزامنة

// ... (الكود الحالي يبقى كما هو)

// وظائف الأجندة
function initializeCalendarModule() {
    // إضافة عنصر القائمة الجديد
    const sidebarMenu = document.querySelector('.sidebar-menu');
    if (sidebarMenu) {
        const calendarItem = document.createElement('li');
        calendarItem.innerHTML = `
            <a href="calendar.html">
                <i class="fas fa-calendar-alt"></i> الأجندة
            </a>
        `;
        sidebarMenu.insertBefore(calendarItem, sidebarMenu.children[4]);
    }
    
    // تحديث الروابط في لوحة التحكم
    const quickActions = document.querySelector('.quick-actions');
    if (quickActions) {
        const calendarAction = document.createElement('a');
        calendarAction.className = 'action-btn';
        calendarAction.href = 'calendar.html';
        calendarAction.innerHTML = `
            <div class="action-icon">
                <i class="fas fa-calendar-alt"></i>
            </div>
            <span>الأجندة</span>
        `;
        quickActions.appendChild(calendarAction);
    }
}

// تهيئة جميع الوحدات
document.addEventListener('DOMContentLoaded', function() {
    initializeLoginModule();
    initializeDashboardModule();
    initializeTasksModule();
    initializeEmployeesModule();
    initializeProfileModule();
    initializeCalendarModule(); // <-- إضافة هذه السطر
    
    // التحقق من تسجيل الدخول في كل الصفحات
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('index.html')) {
        window.location.href = 'login.html';
    }
    
    // حفظ آخر زيارة
    localStorage.setItem('lastLogin', new Date().toISOString());
});

الجزء 4: تحديث ملف data.js

// ... (الكود الحالي يبقى كما هو)

// إضافة بيانات الأحداث الافتراضية
const defaultCalendarEvents = [
    {
        id: 'event-1',
        title: 'اجتماع إدارة الطيف الترددي',
        description: 'اجتماع شهري لمناقشة استراتيجيات إدارة الطيف الترددي',
        start: '2024-03-01T10:00:00',
        end: '2024-03-01T12:00:00',
        color: '#1a237e',
        extendedProps: {
            type: 'event'
        }
    },
    {
        id: 'event-2',
        title: 'ورشة عمل التقنيات اللاسلكية',
        description: 'ورشة عمل لتدريب الموظفين على أحدث التقنيات اللاسلكية',
        start: '2024-03-15T09:00:00',
        end: '2024-03-16T17:00:00',
        color: '#28a745',
        extendedProps: {
            type: 'event'
        }
    }
];

// تحديث دالة initializeData
function initializeData() {
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify(defaultTasks));
    }
    
    if (!localStorage.getItem('employees')) {
        localStorage.setItem('employees', JSON.stringify(defaultEmployees));
    }
    
    if (!localStorage.getItem('calendarEvents')) {
        localStorage.setItem('calendarEvents', JSON.stringify(defaultCalendarEvents));
    }
    
    if (!localStorage.getItem('departments')) {
        const departments = ['الإدارة', 'التقنية', 'المالية', 'المبيعات', 'الدعم الفني', 'التدريب'];
        localStorage.setItem('departments', JSON.stringify(departments));
    }
    
    if (!localStorage.getItem('taskStatuses')) {
        const statuses = ['معلق', 'قيد التنفيذ', 'مكتمل', 'ملغي'];
        localStorage.setItem('taskStatuses', JSON.stringify(statuses));
    }
    
    if (!localStorage.getItem('taskPriorities')) {
        const priorities = ['منخفض', 'متوسط', 'عالي'];
        localStorage.setItem('taskPriorities', JSON.stringify(priorities));
    }
}

// ... (بقية الكود يبقى كما هو)
