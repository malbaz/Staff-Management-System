// بيانات المهام الافتراضية
const defaultTasks = [
    {
        id: 1,
        title: 'تطوير واجهة النظام',
        description: 'تطوير واجهة المستخدم للنظام الجديد باستخدام HTML, CSS, JavaScript',
        assignedTo: 2,
        assignedBy: 1,
        status: 'قيد التنفيذ',
        priority: 'عالي',
        dueDate: '2024-03-15',
        createdAt: '2024-02-01',
        tags: ['تطوير', 'واجهة', 'نظام']
    },
    {
        id: 2,
        title: 'اختبار النظام',
        description: 'اختبار جميع وظائف النظام والتأكد من خلوها من الأخطاء',
        assignedTo: 2,
        assignedBy: 1,
        status: 'معلق',
        priority: 'متوسط',
        dueDate: '2024-03-20',
        createdAt: '2024-02-05',
        tags: ['اختبار', 'جودة']
    },
    {
        id: 3,
        title: 'تدريب الموظفين',
        description: 'تدريب الموظفين على استخدام النظام الجديد',
        assignedTo: 3,
        assignedBy: 1,
        status: 'مكتمل',
        priority: 'عالي',
        dueDate: '2024-02-28',
        createdAt: '2024-01-15',
        tags: ['تدريب', 'موظفين']
    },
    {
        id: 4,
        title: 'تقرير الأداء الشهري',
        description: 'إعداد تقرير الأداء الشهري لفريق العمل',
        assignedTo: 4,
        assignedBy: 1,
        status: 'قيد التنفيذ',
        priority: 'متوسط',
        dueDate: '2024-03-10',
        createdAt: '2024-02-10',
        tags: ['تقارير', 'أداء']
    },
    {
        id: 5,
        title: 'تحديث قاعدة البيانات',
        description: 'تحديث قاعدة البيانات وإضافة الجداول الجديدة',
        assignedTo: 2,
        assignedBy: 1,
        status: 'معلق',
        priority: 'منخفض',
        dueDate: '2024-03-25',
        createdAt: '2024-02-12',
        tags: ['قاعدة بيانات', 'تحديث']
    }
];

// بيانات الموظفين الافتراضية
const defaultEmployees = [
    {
        id: 1,
        username: 'admin',
        password: 'admin123',
        name: 'مدير النظام',
        email: ' 7mooody2009@gmail.com',
        phone: '0554300039',
        department: 'الإدارة',
        jobTitle: 'مدير النظام',
        permissions: ['all'],
        joinDate: '2024-01-01'
    },
    {
        id: 2,
        username: 'waseem',
        password: 'waseem123',
        name: 'hzam',
        email: 'ahmed@spectrum.gov.sa',
        phone: '0507654321',
        department: 'سكرتارية',
        jobTitle: 'مطور ويب',
        permissions: ['view_tasks', 'create_tasks', 'edit_tasks'],
        joinDate: '2024-01-15'
    },
    {
        id: 3,
        username: 'sara',
        password: 'sara123',
        name: 'سارة أحمد',
        email: 'sara@spectrum.gov.sa',
        phone: '0509876543',
        department: 'التدريب',
        jobTitle: 'مدربة',
        permissions: ['view_tasks', 'create_tasks'],
        joinDate: '2024-01-20'
    },
    {
        id: 4,
        username: 'khaled',
        password: 'khaled123',
        name: 'خالد عبدالله',
        email: 'khaled@spectrum.gov.sa',
        phone: '0501122334',
        department: 'الإدارة',
        jobTitle: 'مدير مشاريع',
        permissions: ['view_tasks', 'create_tasks', 'edit_tasks', 'delete_tasks'],
        joinDate: '2024-02-01'
    },
    {
        id: 5,
        username: 'nora',
        password: 'nora123',
        name: 'نورة سعيد',
        email: 'nora@spectrum.gov.sa',
        phone: '0505566778',
        department: 'المالية',
        jobTitle: 'محاسبة',
        permissions: ['view_tasks'],
        joinDate: '2024-02-10'
    }
];

// تهيئة البيانات في localStorage
function initializeData() {
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify(defaultTasks));
    }
    
    if (!localStorage.getItem('employees')) {
        localStorage.setItem('employees', JSON.stringify(defaultEmployees));
    }
    
    if (!localStorage.getItem('departments')) {
        const departments = ['الإدارة', 'سكرتارية', 'شعبة تخطيط الطيف الترددي', 'شعبة عمليات الطيف الترددي', 'شعبة مكتب التواصل لشؤون الطيف الترددي'];
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

// تصدير الدوال
window.initializeData = initializeData;

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

