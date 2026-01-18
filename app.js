// تطبيق مُحسَّن لإدارة المهام والموظفين

document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    initMobileMenu();
    loadInitialData();
    setupEventListeners();
});

function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    const currentPage = window.location.pathname.split('/').pop();

    if (currentUser && currentPage === 'login.html') {
        window.location.href = 'dashboard.html';
        return;
    }

    const protectedPages = ['dashboard.html', 'tasks.html', 'employees.html', 'profile.html'];
    if (!currentUser && protectedPages.includes(currentPage)) {
        window.location.href = 'login.html';
    }
}

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active'); // استخدام كلاس لتفعيل/إلغاء تفعيل القائمة
        });

        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    }
}

function loadInitialData() {
    if (!localStorage.getItem('employees')) {
        const initialEmployees = [
            { id: 1, username: 'admin', password: 'admin123', name: 'مدير النظام', email: 'admin@spectrum.gov.sa', phone: '0501234567', department: 'الإدارة', jobTitle: 'مدير النظام', permissions: ['all'] },
            { id: 2, username: 'ahmed', password: 'ahmed123', name: 'أحمد محمد', email: 'ahmed@spectrum.gov.sa', phone: '0507654321', department: 'التقنية', jobTitle: 'مطور ويب', permissions: ['view_tasks', 'create_tasks'] }
        ];
        localStorage.setItem('employees', JSON.stringify(initialEmployees));
    }

    if (!localStorage.getItem('tasks')) {
        const initialTasks = [
            { id: 1, title: 'تطوير واجهة النظام', description: 'تطوير واجهة المستخدم للنظام الجديد', assignedTo: 2, assignedBy: 1, status: 'قيد التنفيذ', priority: 'عالي', dueDate: '2024-03-15', createdAt: '2024-02-01' },
            { id: 2, title: 'اختبار النظام', description: 'اختبار جميع وظائف النظام', assignedTo: 2, assignedBy: 1, status: 'معلق', priority: 'متوسط', dueDate: '2024-03-20', createdAt: '2024-02-05' }
        ];
        localStorage.setItem('tasks', JSON.stringify(initialTasks));
    }
}

function setupEventListeners() {
    const currentPage = window.location.pathname.split('/').pop();

    const pageSetups = {
        'login.html': setupLoginPage,
        'dashboard.html': setupDashboardPage,
        'tasks.html': setupTasksPage,
        'employees.html': setupEmployeesPage,
        'profile.html': setupProfilePage
    };

    const setupFunction = pageSetups[currentPage];
    if (setupFunction) {
        setupFunction();
    }
}

function setupLoginPage() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const employees = JSON.parse(localStorage.getItem('employees')) || [];
            const user = employees.find(emp => emp.username === username && emp.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('lastLogin', new Date().toISOString());
                window.location.href = 'dashboard.html';
            } else {
                alert('اسم المستخدم أو كلمة المرور غير صحيحة');
            }
        });
    }

    const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
    if (forgotPasswordBtn) {
        forgotPasswordBtn.addEventListener('click', () => {
            const email = prompt('أدخل بريدك الإلكتروني:');
            if (email) {
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

function setupDashboardPage() {
    updateDashboardStats();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userNameElement = document.getElementById('userName');
    if (userNameElement && currentUser) {
        userNameElement.textContent = currentUser.name;
    }
}

function updateDashboardStats() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const employees = JSON.parse(localStorage.getItem('employees')) || [];

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'مكتمل').length;
    const pendingTasks = tasks.filter(task => task.status === 'معلق').length;
    const inProgressTasks = tasks.filter(task => task.status === 'قيد التنفيذ').length;

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

    displayRecentTasks(tasks.slice(0, 5));
}

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

function setupTasksPage() {
    loadAndDisplayTasks();

    const addTaskBtn = document.getElementById('addTaskBtn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', showAddTaskModal);
    }

    const searchInput = document.getElementById('taskSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterTasks);
    }
}

function loadAndDisplayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const tasksContainer = document.getElementById('tasksContainer');
    if (!tasksContainer) return;

    tasksContainer.innerHTML = '';

    let filteredTasks = tasks;
    if (currentUser && !currentUser.permissions.includes('all')) {
        filteredTasks = tasks.filter(task =>
            task.assignedTo === currentUser.id ||
            task.assignedBy === currentUser.id
        );
    }

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
                <button class="btn btn-sm btn-primary" onclick="window.editTask(${task.id})">
                    <i class="fas fa-edit"></i> تعديل
                </button>
                <button class="btn btn-sm btn-danger" onclick="window.deleteTask(${task.id})">
                    <i class="fas fa-trash"></i> حذف
                </button>
            </div>
        `;
        tasksContainer.appendChild(taskElement);
    });
}

function setupEmployeesPage() {
    loadAndDisplayEmployees();

    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    if (addEmployeeBtn) {
        addEmployeeBtn.addEventListener('click', showAddEmployeeModal);
    }
}

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
                <button class="btn btn-sm btn-primary" onclick="window.editEmployee(${employee.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="window.deleteEmployee(${employee.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        employeesContainer.appendChild(employeeElement);
    });
}

function setupProfilePage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profilePhone').textContent = currentUser.phone;
    document.getElementById('profileDepartment').textContent = currentUser.department;
    document.getElementById('profileJobTitle').textContent = currentUser.jobTitle;

    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', (e) => {
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

            const employees = JSON.parse(localStorage.getItem('employees'));
            const employeeIndex = employees.findIndex(emp => emp.id === currentUser.id);

            if (employeeIndex !== -1) {
                employees[employeeIndex].password = newPassword;
                localStorage.setItem('employees', JSON.stringify(employees));

                currentUser.password = newPassword;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                alert('تم تغيير كلمة المرور بنجاح');
                changePasswordForm.reset();
            }
        });
    }
}

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

window.editTask = function(taskId) {
    alert(`تعديل المهمة رقم ${taskId}`);
};

window.deleteTask = function(taskId) {
    if (confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadAndDisplayTasks();
        alert('تم حذف المهمة بنجاح');
    }
};

window.editEmployee = function(employeeId) {
    alert(`تعديل بيانات الموظف رقم ${employeeId}`);
};

window.deleteEmployee = function(employeeId) {
    if (confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
        let employees = JSON.parse(localStorage.getItem('employees')) || [];
        employees = employees.filter(emp => emp.id !== employeeId);
        localStorage.setItem('employees', JSON.stringify(employees));
        loadAndDisplayEmployees();
        alert('تم حذف الموظف بنجاح');
    }
};

function showAddEmployeeModal() {
    alert('سيتم عرض نموذج إضافة موظف هنا');
}
