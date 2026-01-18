// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من حالة تسجيل الدخول
    checkLoginStatus();
    
    // تهيئة القائمة المتنقلة
    initMobileMenu();
    
    // تحميل البيانات
    loadInitialData();
    
    // إضافة مستمعي الأحداث
    setupEventListeners();
});

// التحقق من حالة تسجيل الدخول
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    const currentPage = window.location.pathname.split('/').pop();
    
    // إذا كان المستخدم مسجل دخول ويحاول الوصول لصفحة تسجيل الدخول
    if (currentUser && currentPage === 'login.html') {
        window.location.href = 'dashboard.html';
    }
    
    // إذا لم يكن المستخدم مسجل دخول ويحاول الوصول لصفحة محمية
    const protectedPages = ['dashboard.html', 'tasks.html', 'employees.html', 'profile.html'];
    if (!currentUser && protectedPages.includes(currentPage)) {
        window.location.href = 'login.html';
    }
}

// تهيئة القائمة المتنقلة
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.right = '0';
            navMenu.style.background = 'linear-gradient(135deg, #1a237e 0%, #283593 100%)';
            navMenu.style.padding = '1rem';
            navMenu.style.borderRadius = '0 0 0 10px';
            navMenu.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            navMenu.style.zIndex = '1000';
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                navMenu.style.display = 'none';
            }
        });
    }
}

// تحميل البيانات الأولية
function loadInitialData() {
    // تحميل بيانات الموظفين إذا لم تكن موجودة
    if (!localStorage.getItem('employees')) {
        const initialEmployees = [
            {
                id: 1,
                username: 'admin',
                password: 'admin123',
                name: 'مدير النظام',
                email: 'admin@spectrum.gov.sa',
                phone: '0501234567',
                department: 'الإدارة',
                jobTitle: 'مدير النظام',
                permissions: ['all']
            },
            {
                id: 2,
                username: 'ahmed',
                password: 'ahmed123',
                name: 'أحمد محمد',
                email: 'ahmed@spectrum.gov.sa',
                phone: '0507654321',
                department: 'التقنية',
                jobTitle: 'مطور ويب',
                permissions: ['view_tasks', 'create_tasks']
            }
        ];
        localStorage.setItem('employees', JSON.stringify(initialEmployees));
    }
    
    // تحميل بيانات المهام إذا لم تكن موجودة
    if (!localStorage.getItem('tasks')) {
        const initialTasks = [
            {
                id: 1,
                title: 'تطوير واجهة النظام',
                description: 'تطوير واجهة المستخدم للنظام الجديد',
                assignedTo: 2,
                assignedBy: 1,
                status: 'قيد التنفيذ',
                priority: 'عالي',
                dueDate: '2024-03-15',
                createdAt: '2024-02-01'
            },
            {
                id: 2,
                title: 'اختبار النظام',
                description: 'اختبار جميع وظائف النظام',
                assignedTo: 2,
                assignedBy: 1,
                status: 'معلق',
                priority: 'متوسط',
                dueDate: '2024-03-20',
                createdAt: '2024-02-05'
            }
        ];
        localStorage.setItem('tasks', JSON.stringify(initialTasks));
    }
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // مستمعي الأحداث للصفحة الحالية
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'login.html':
            setupLoginPage();
            break;
        case 'dashboard.html':
            setupDashboardPage();
            break;
        case 'tasks.html':
            setupTasksPage();
            break;
        case 'employees.html':
            setupEmployeesPage();
            break;
        case 'profile.html':
            setupProfilePage();
            break;
    }
}

// إعداد صفحة تسجيل الدخول
function setupLoginPage() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // التحقق من بيانات الدخول
            const employees = JSON.parse(localStorage.getItem('employees')) || [];
            const user = employees.find(emp => emp.username === username && emp.password === password);
            
            if (user) {
                // حفظ بيانات المستخدم الحالي
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // تسجيل وقت الدخول
                localStorage.setItem('lastLogin', new Date().toISOString());
                
                // توجيه إلى لوحة التحكم
                window.location.href = 'dashboard.html';
            } else {
                alert('اسم المستخدم أو كلمة المرور غير صحيحة');
            }
        });
    }
    
    // زر استعادة كلمة المرور
    const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
    if (forgotPasswordBtn) {
        forgotPasswordBtn.addEventListener('click', function() {
            const email = prompt('أدخل بريدك الإلكتروني:');
            if (email) {
                // البحث عن المستخدم بالبريد الإلكتروني
                const employees = JSON.parse(localStorage.getItem('employees')) || [];
                const user = employees.find(emp => emp.email === email);
                
                if (user) {
                    alert(`تم إرسال تعليمات استعادة كلمة المرور إلى ${email}`);
                } else {
                    alert('البريد الإلكتروني غير مسجل في النظام');
                }
            }
        });
    }
}

// إعداد صفحة لوحة التحكم
function setupDashboardPage() {
    // تحديث إحصائيات لوحة التحكم
    updateDashboardStats();
    
    // زر تسجيل الخروج
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
    
    // عرض اسم المستخدم
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userNameElement = document.getElementById('userName');
    if (userNameElement && currentUser) {
        userNameElement.textContent = currentUser.name;
    }
}

// تحديث إحصائيات لوحة التحكم
function updateDashboardStats() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // حساب الإحصائيات
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'مكتمل').length;
    const pendingTasks = tasks.filter(task => task.status === 'معلق').length;
    const inProgressTasks = tasks.filter(task => task.status === 'قيد التنفيذ').length;
    
    // تحديث العناصر
    const elements = {
        'totalTasks': totalTasks,
        'completedTasks': completedTasks,
        'pendingTasks': pendingTasks,
        'inProgressTasks': inProgressTasks,
        'totalEmployees': employees.length
    };
    
    for (const [id, value] of Object.entries(elements)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }
    
    // عرض المهام الأخيرة
    displayRecentTasks(tasks.slice(0, 5));
}

// عرض المهام الأخيرة
function displayRecentTasks(tasks) {
    const recentTasksElement = document.getElementById('recentTasks');
    if (!recentTasksElement) return;
    
    recentTasksElement.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
            <div class="task-title">${task.title}</div>
            <div class="task-status ${task.status.replace(' ', '-')}">${task.status}</div>
            <div class="task-due">${task.dueDate}</div>
        `;
        recentTasksElement.appendChild(taskElement);
    });
}

// إعداد صفحة المهام
function setupTasksPage() {
    // تحميل وعرض المهام
    loadAndDisplayTasks();
    
    // إضافة مستمع حدث لزر إضافة مهمة
    const addTaskBtn = document.getElementById('addTaskBtn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', showAddTaskModal);
    }
    
    // إضافة مستمع حدث للبحث
    const searchInput = document.getElementById('taskSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterTasks);
    }
}

// تحميل وعرض المهام
function loadAndDisplayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    const tasksContainer = document.getElementById('tasksContainer');
    if (!tasksContainer) return;
    
    tasksContainer.innerHTML = '';
    
    // تصفية المهام بناءً على صلاحيات المستخدم
    let filteredTasks = tasks;
    if (currentUser && !currentUser.permissions.includes('all')) {
        filteredTasks = tasks.filter(task => 
            task.assignedTo === currentUser.id || 
            task.assignedBy === currentUser.id
        );
    }
    
    // عرض المهام
    filteredTasks.forEach(task => {
        const assignedToEmployee = employees.find(emp => emp.id === task.assignedTo);
        const assignedByEmployee = employees.find(emp => emp.id === task.assignedBy);
        
        const taskElement = document.createElement('div');
        taskElement.className = 'task-card';
        taskElement.innerHTML = `
            <div class="task-header">
                <h3>${task.title}</h3>
                <span class="task-priority ${task.priority}">${task.priority}</span>
            </div>
            <div class="task-body">
                <p>${task.description}</p>
                <div class="task-info">
                    <div><i class="fas fa-user"></i> ${assignedToEmployee?.name || 'غير معين'}</div>
                    <div><i class="fas fa-calendar"></i> ${task.dueDate}</div>
                    <div><i class="fas fa-flag"></i> ${task.status}</div>
                </div>
            </div>
            <div class="task-footer">
                <button class="btn btn-sm btn-primary" onclick="editTask(${task.id})">
                    <i class="fas fa-edit"></i> تعديل
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">
                    <i class="fas fa-trash"></i> حذف
                </button>
            </div>
        `;
        tasksContainer.appendChild(taskElement);
    });
}

// إعداد صفحة الموظفين
function setupEmployeesPage() {
    // تحميل وعرض الموظفين
    loadAndDisplayEmployees();
    
    // إضافة مستمع حدث لزر إضافة موظف
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    if (addEmployeeBtn) {
        addEmployeeBtn.addEventListener('click', showAddEmployeeModal);
    }
}

// تحميل وعرض الموظفين
function loadAndDisplayEmployees() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employeesContainer = document.getElementById('employeesContainer');
    
    if (!employeesContainer) return;
    
    employeesContainer.innerHTML = '';
    
    employees.forEach(employee => {
        const employeeElement = document.createElement('div');
        employeeElement.className = 'employee-card';
        employeeElement.innerHTML = `
            <div class="employee-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="employee-info">
                <h3>${employee.name}</h3>
                <p>${employee.jobTitle}</p>
                <p>${employee.department}</p>
                <p><i class="fas fa-envelope"></i> ${employee.email}</p>
                <p><i class="fas fa-phone"></i> ${employee.phone}</p>
            </div>
            <div class="employee-actions">
                <button class="btn btn-sm btn-primary" onclick="editEmployee(${employee.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteEmployee(${employee.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        employeesContainer.appendChild(employeeElement);
    });
}

// إعداد صفحة الملف الشخصي
function setupProfilePage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // تعبئة بيانات الملف الشخصي
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profilePhone').textContent = currentUser.phone;
    document.getElementById('profileDepartment').textContent = currentUser.department;
    document.getElementById('profileJobTitle').textContent = currentUser.jobTitle;
    
    // إضافة مستمع حدث لتغيير كلمة المرور
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (currentPassword !== currentUser.password) {
                alert('كلمة المرور الحالية غير صحيحة');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('كلمة المرور الجديدة غير متطابقة');
                return;
            }
            
            // تحديث كلمة المرور
            const employees = JSON.parse(localStorage.getItem('employees'));
            const employeeIndex = employees.findIndex(emp => emp.id === currentUser.id);
            
            if (employeeIndex !== -1) {
                employees[employeeIndex].password = newPassword;
                localStorage.setItem('employees', JSON.stringify(employees));
                
                // تحديث المستخدم الحالي
                currentUser.password = newPassword;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                alert('تم تغيير كلمة المرور بنجاح');
                changePasswordForm.reset();
            }
        });
    }
}

// وظائف مساعدة
function showAddTaskModal() {
    const modalHTML = `
        <div class="modal" id="addTaskModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>إضافة مهمة جديدة</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="newTaskForm">
                        <div class="form-group">
                            <label for="taskTitle">عنوان المهمة</label>
                            <input type="text" id="taskTitle" required>
                        </div>
                        <div class="form-group">
                            <label for="taskDescription">وصف المهمة</label>
                            <textarea id="taskDescription" rows="3" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="taskAssignee">تعيين إلى</label>
                            <select id="taskAssignee" required>
                                ${getEmployeesOptions()}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="taskPriority">الأولوية</label>
                            <select id="taskPriority" required>
                                <option value="منخفض">منخفض</option>
                                <option value="متوسط">متوسط</option>
                                <option value="عالي">عالي</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="taskDueDate">تاريخ الاستحقاق</label>
                            <input type="date" id="taskDueDate" required>
                        </div>
                        <button type="submit" class="btn btn-primary">إضافة المهمة</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // إضافة مستمعي الأحداث للمودال
    const modal = document.getElementById('addTaskModal');
    const closeBtn = modal.querySelector('.close-modal');
    const form = document.getElementById('newTaskForm');
    
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addNewTask();
        modal.remove();
    });
}

function getEmployeesOptions() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    return employees.map(emp => 
        `<option value="${emp.id}">${emp.name} - ${emp.department}</option>`
    ).join('');
}

function addNewTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    const newTask = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        assignedTo: parseInt(document.getElementById('taskAssignee').value),
        assignedBy: currentUser.id,
        status: 'معلق',
        priority: document.getElementById('taskPriority').value,
        dueDate: document.getElementById('taskDueDate').value,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // إعادة تحميل المهام
    loadAndDisplayTasks();
    alert('تم إضافة المهمة بنجاح');
}

function filterTasks() {
    const searchTerm = document.getElementById('taskSearch').value.toLowerCase();
    const taskCards = document.querySelectorAll('.task-card');
    
    taskCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// وظائف عامة
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// تصدير الوظائف للاستخدام في HTML
window.editTask = function(taskId) {
    alert(`تعديل المهمة رقم ${taskId}`);
    // يمكنك إضافة منطق التعديل هنا
};

window.deleteTask = function(taskId) {
    if (confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        loadAndDisplayTasks();
        alert('تم حذف المهمة بنجاح');
    }
};

window.editEmployee = function(employeeId) {
    alert(`تعديل بيانات الموظف رقم ${employeeId}`);
    // يمكنك إضافة منطق التعديل هنا
};

window.deleteEmployee = function(employeeId) {
    if (confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        loadAndDisplayEmployees();
        alert('تم حذف الموظف بنجاح');
    }
};
