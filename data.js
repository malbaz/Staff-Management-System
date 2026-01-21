// بيانات الموظفين الافتراضية
const defaultEmployees = [
    {
        id: 1,
        username: 'mbaz',
        password: 'mbaz123',
        name: ' محمد بن سعد الباز',
        email: '7mooody2009@gmail.com',
        phone: '0554300039',
        department: 'مكتب إدارة الطيف الترددي',
        jobTitle: 'مدير مكتب التواصل لشؤون الطيف الترددي',
        permissions: ['all'],
        joinDate: '2024-01-01'
    },
    {
        id: 2,
        username: 'waseem',
        password: 'waseem123',
        name: 'وسيم بن عمر العمود',
        email: 'waseem_alamoudi@hotmail.com',
        phone: '0503714473',
        department: 'الادارة',
        jobTitle: 'مدير مكتب إدارة الطيف الترددي',
        permissions: ['view_tasks', 'create_tasks', 'edit_tasks', 'delete_tasks'],
        joinDate: '2024-01-15'
    },
    {
        id: 3,
        username: 'حزام',
        password: 'sara123',
        name: 'حزام بن علي ال وافي ',
        email: 'haalwafi@hq.moi.gov.sa,
        phone: '0534060383',
        department: 'مكتب إدارة الطيف الترددي',
        jobTitle: 'مدير شعبة تخطيط الطيف الترددي',
        permissions: ['view_tasks', 'create_tasks', 'edit_tasks'],
        joinDate: '2024-01-20'
    },
    {
        id: 4,
        username: 'omar',
        password: 'omar123',
        name: 'عمر بن عطا لله العوض ',
        email: 'oaahawd@hq.moi.gov.sa',
        phone: '0535318316',
        department: 'مكتب إدارة الطيف الترددي',
        jobTitle: 'مدير شعبة عمليات الطيف الترددي',
        permissions: ['view_tasks', 'create_tasks', 'edit_tasks'],
        joinDate: '2024-02-01'
    },
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
        const departments = ['الإدارة', 'سكرتارية', 'شعبة تخطيط الطيف الترددي', 'شعبة عمليات الطيف الترددي', 'مكتب التواصل لشؤون الطيف الترددي'];
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

