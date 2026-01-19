<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إدارة المهام - مكتب إدارة الطيف الترددي</title>
    <base target="_self">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/x-icon" href="images/logo.png">
    <style>
        .tasks-page {
            min-height: 100vh;
            background: #f5f7fa;
        }
        
        .page-header {
            background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
            color: white;
            padding: 2rem;
            margin-bottom: 2rem;
        }
        
        .page-header-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .page-title {
            font-size: 1.8rem;
            margin: 0;
        }
        
        .page-actions {
            display: flex;
            gap: 1rem;
        }
        
        .tasks-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem 2rem;
        }
        
        .tasks-toolbar {
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            margin-bottom: 2rem;
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            align-items: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        
        .search-box {
            flex: 1;
            min-width: 300px;
            position: relative;
        }
        
        .search-box input {
            width: 100%;
            padding: 0.8rem 1rem 0.8rem 3rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
        }
        
        .search-box i {
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #666;
        }
        
        .filter-select {
            padding: 0.8rem 1rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: white;
            font-size: 1rem;
            min-width: 150px;
        }
        
        .tasks-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 1.5rem;
        }
        
        .task-card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
            transition: transform 0.3s ease;
        }
        
        .task-card:hover {
            transform: translateY(-5px);
        }
        
        .task-header {
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        
        .task-title {
            font-size: 1.2rem;
            color: #1a237e;
            margin: 0;
            flex: 1;
        }
        
        .task-priority {
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .task-priority.عالي {
            background: #ffebee;
            color: #c62828;
        }
        
        .task-priority.متوسط {
            background: #fff3e0;
            color: #ef6c00;
        }
        
        .task-priority.منخفض {
            background: #e8f5e9;
            color: #2e7d32;
        }
        
        .task-body {
            padding: 1.5rem;
        }
        
        .task-description {
            color: #666;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }
        
        .task-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            font-size: 0.9rem;
            color: #666;
        }
        
        .task-info div {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .task-footer {
            padding: 1.5rem;
            border-top: 1px solid #eee;
            display: flex;
            gap: 0.5rem;
            justify-content: flex-end;
        }
        
        .btn-sm {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        }
        
        .btn-danger {
            background: #dc3545;
            color: white;
            border: none;
        }
        
        .btn-danger:hover {
            background: #c82333;
        }
        
        .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            color: #666;
        }
        
        .empty-state i {
            font-size: 4rem;
            color: #ddd;
            margin-bottom: 1rem;
        }
        
        .back-btn {
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
        }
        
        .back-btn:hover {
            background: rgba(255,255,255,0.2);
        }
        
        @media (max-width: 768px) {
            .tasks-grid {
                grid-template-columns: 1fr;
            }
            
            .tasks-toolbar {
                flex-direction: column;
                align-items: stretch;
            }
            
            .search-box {
                min-width: 100%;
            }
        }
    </style>
</head>
<body class="tasks-page">
    <!-- رأس الصفحة -->
    <header class="page-header">
        <div class="page-header-content">
            <div>
                <h1 class="page-title"><i class="fas fa-tasks"></i> إدارة المهام</h1>
                <p>إدارة ومتابعة جميع المهام والمسؤوليات</p>
            </div>
            <div class="page-actions">
                <a href="dashboard.html" class="back-btn">
                    <i class="fas fa-arrow-right"></i> العودة
                </a>
                <button class="btn btn-primary" id="addTaskBtn">
                    <i class="fas fa-plus"></i> إضافة مهمة
                </button>
            </div>
        </div>
    </header>

    <div class="tasks-container">
        <!-- شريط الأدوات -->
        <div class="tasks-toolbar">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="taskSearch" placeholder="ابحث عن مهمة...">
            </div>
            
            <select class="filter-select" id="statusFilter">
                <option value="">جميع الحالات</option>
                <option value="معلق">معلق</option>
                <option value="قيد التنفيذ">قيد التنفيذ</option>
                <option value="مكتمل">مكتمل</option>
            </select>
            
            <select class="filter-select" id="priorityFilter">
                <option value="">جميع الأولويات</option>
                <option value="عالي">عالي</option>
                <option value="متوسط">متوسط</option>
                <option value="منخفض">منخفض</option>
            </select>
            
            <button class="btn btn-secondary" id="resetFilters">
                <i class="fas fa-redo"></i> إعادة تعيين
            </button>
        </div>

        <!-- قائمة المهام -->
        <div class="tasks-grid" id="tasksContainer">
            <!-- سيتم تعبئة المهام هنا بواسطة JavaScript -->
            <div class="empty-state">
                <i class="fas fa-tasks"></i>
                <h3>لا توجد مهام حالياً</h3>
                <p>انقر على زر "إضافة مهمة" لبدء إضافة المهام</p>
            </div>
        </div>
    </div>

    <script src="app.js"></script>
    <script>
        // تحميل وعرض المهام
        function loadAndDisplayTasks() {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const employees = JSON.parse(localStorage.getItem('employees')) || [];
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const tasksContainer = document.getElementById('tasksContainer');
            
            if (!tasksContainer) return;
            
            // تصفية المهام بناءً على البحث والفلتر
            const searchTerm = document.getElementById('taskSearch')?.value.toLowerCase() || '';
            const statusFilter = document.getElementById('statusFilter')?.value || '';
            const priorityFilter = document.getElementById('priorityFilter')?.value || '';
            
            let filteredTasks = tasks;
            
            // تصفية حسب البحث
            if (searchTerm) {
                filteredTasks = filteredTasks.filter(task => 
                    task.title.toLowerCase().includes(searchTerm) || 
                    task.description.toLowerCase().includes(searchTerm)
                );
            }
            
            // تصفية حسب الحالة
            if (statusFilter) {
                filteredTasks = filteredTasks.filter(task => task.status === statusFilter);
            }
            
            // تصفية حسب الأولوية
            if (priorityFilter) {
                filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
            }
            
            // تصفية حسب صلاحيات المستخدم
            if (currentUser && !currentUser.permissions.includes('all')) {
                filteredTasks = filteredTasks.filter(task => 
                    task.assignedTo === currentUser.id || 
                    task.assignedBy === currentUser.id
                );
            }
            
            // عرض المهام
            tasksContainer.innerHTML = '';
            
            if (filteredTasks.length === 0) {
                tasksContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-tasks"></i>
                        <h3>لا توجد مهام</h3>
                        <p>لا توجد مهام تطابق معايير البحث</p>
                    </div>
                `;
                return;
            }
            
            filteredTasks.forEach(task => {
                const assignedToEmployee = employees.find(emp => emp.id === task.assignedTo);
                const assignedByEmployee = employees.find(emp => emp.id === task.assignedBy);
                
                const taskElement = document.createElement('div');
                taskElement.className = 'task-card';
                taskElement.innerHTML = `
                    <div class="task-header">
                        <h3 class="task-title">${task.title}</h3>
                        <span class="task-priority ${task.priority}">${task.priority}</span>
                    </div>
                    <div class="task-body">
                        <p class="task-description">${task.description}</p>
                        <div class="task-info">
                            <div><i class="fas fa-user"></i> <strong>المسند إليه:</strong> ${assignedToEmployee?.name || 'غير معين'}</div>
                            <div><i class="fas fa-user-tie"></i> <strong>المسند من:</strong> ${assignedByEmployee?.name || 'غير معين'}</div>
                            <div><i class="fas fa-flag"></i> <strong>الحالة:</strong> ${task.status}</div>
                            <div><i class="fas fa-calendar"></i> <strong>تاريخ الاستحقاق:</strong> ${task.dueDate}</div>
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
        
        // إضافة مهمة جديدة
        function showAddTaskModal() {
            const modalHTML = `
                <div class="modal-overlay" id="addTaskModal">
                    <div class="modal">
                        <div class="modal-header">
                            <h3><i class="fas fa-plus"></i> إضافة مهمة جديدة</h3>
                            <button class="close-modal" onclick="closeModal()">&times;</button>
                        </div>
                        <div class="modal-body">
                            <form id="newTaskForm">
                                <div class="form-group">
                                    <label for="taskTitle">عنوان المهمة *</label>
                                    <input type="text" id="taskTitle" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label for="taskDescription">وصف المهمة *</label>
                                    <textarea id="taskDescription" class="form-control" rows="3" required></textarea>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="taskAssignee">تعيين إلى *</label>
                                        <select id="taskAssignee" class="form-control" required>
                                            ${getEmployeesOptions()}
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="taskPriority">الأولوية *</label>
                                        <select id="taskPriority" class="form-control" required>
                                            <option value="منخفض">منخفض</option>
                                            <option value="متوسط" selected>متوسط</option>
                                            <option value="عالي">عالي</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="taskStatus">الحالة *</label>
                                        <select id="taskStatus" class="form-control" required>
                                            <option value="معلق" selected>معلق</option>
                                            <option value="قيد التنفيذ">قيد التنفيذ</option>
                                            <option value="مكتمل">مكتمل</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="taskDueDate">تاريخ الاستحقاق *</label>
                                        <input type="date" id="taskDueDate" class="form-control" required>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" onclick="closeModal()">إلغاء</button>
                                    <button type="submit" class="btn btn-primary">إضافة المهمة</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // تعيين تاريخ اليوم كتاريخ افتراضي
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('taskDueDate').value = today;
            
            // إضافة مستمعي الأحداث للمودال
            const form = document.getElementById('newTaskForm');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                addNewTask();
            });
        }
        
        // الحصول على قائمة الموظفين للاختيار
        function getEmployeesOptions() {
            const employees = JSON.parse(localStorage.getItem('employees')) || [];
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            let options = '<option value="">اختر الموظف...</option>';
            employees.forEach(emp => {
                if (emp.id !== currentUser.id) { // لا يمكن تعيين المهمة لنفسه
                    options += `<option value="${emp.id}">${emp.name} - ${emp.department}</option>`;
                }
            });
            return options;
        }
        
        // إضافة مهمة جديدة
        function addNewTask() {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            const newTask = {
                id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
                title: document.getElementById('taskTitle').value,
                description: document.getElementById('taskDescription').value,
                assignedTo: parseInt(document.getElementById('taskAssignee').value),
                assignedBy: currentUser.id,
                status: document.getElementById('taskStatus').value,
                priority: document.getElementById('taskPriority').value,
                dueDate: document.getElementById('taskDueDate').value,
                createdAt: new Date().toISOString().split('T')[0]
            };
            
            tasks.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            
            // إعادة تحميل المهام
            loadAndDisplayTasks();
            closeModal();
            alert('تم إضافة المهمة بنجاح');
        }
        
        // تعديل مهمة
        function editTask(taskId) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const task = tasks.find(t => t.id === taskId);
            
            if (!task) {
                alert('المهمة غير موجودة');
                return;
            }
            
            const modalHTML = `
                <div class="modal-overlay" id="editTaskModal">
                    <div class="modal">
                        <div class="modal-header">
                            <h3><i class="fas fa-edit"></i> تعديل المهمة</h3>
                            <button class="close-modal" onclick="closeModal()">&times;</button>
                        </div>
                        <div class="modal-body">
                            <form id="editTaskForm">
                                <div class="form-group">
                                    <label for="editTaskTitle">عنوان المهمة *</label>
                                    <input type="text" id="editTaskTitle" class="form-control" value="${task.title}" required>
                                </div>
                                <div class="form-group">
                                    <label for="editTaskDescription">وصف المهمة *</label>
                                    <textarea id="editTaskDescription" class="form-control" rows="3" required>${task.description}</textarea>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="editTaskAssignee">تعيين إلى *</label>
                                        <select id="editTaskAssignee" class="form-control" required>
                                            ${getEmployeesOptionsForEdit(task.assignedTo)}
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="editTaskPriority">الأولوية *</label>
                                        <select id="editTaskPriority" class="form-control" required>
                                            <option value="منخفض" ${task.priority === 'منخفض' ? 'selected' : ''}>منخفض</option>
                                            <option value="متوسط" ${task.priority === 'متوسط' ? 'selected' : ''}>متوسط</option>
                                            <option value="عالي" ${task.priority === 'عالي' ? 'selected' : ''}>عالي</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="editTaskStatus">الحالة *</label>
                                        <select id="editTaskStatus" class="form-control" required>
                                            <option value="معلق" ${task.status === 'معلق' ? 'selected' : ''}>معلق</option>
                                            <option value="قيد التنفيذ" ${task.status === 'قيد التنفيذ' ? 'selected' : ''}>قيد التنفيذ</option>
                                            <option value="مكتمل" ${task.status === 'مكتمل' ? 'selected' : ''}>مكتمل</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="editTaskDueDate">تاريخ الاستحقاق *</label>
                                        <input type="date" id="editTaskDueDate" class="form-control" value="${task.dueDate}" required>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" onclick="closeModal()">إلغاء</button>
                                    <button type="submit" class="btn btn-primary">حفظ التعديلات</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // إضافة مستمعي الأحداث للمودال
            const form = document.getElementById('editTaskForm');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                updateTask(taskId);
            });
        }
        
        // الحصول على قائمة الموظفين للتعديل
        function getEmployeesOptionsForEdit(currentAssigneeId) {
            const employees = JSON.parse(localStorage.getItem('employees')) || [];
            let options = '';
            employees.forEach(emp => {
                const selected = emp.id === currentAssigneeId ? 'selected' : '';
                options += `<option value="${emp.id}" ${selected}>${emp.name} - ${emp.department}</option>`;
            });
            return options;
        }
        
        // تحديث المهمة
        function updateTask(taskId) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            
            if (taskIndex === -1) {
                alert('المهمة غير موجودة');
                return;
            }
            
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                title: document.getElementById('editTaskTitle').value,
                description: document.getElementById('editTaskDescription').value,
                assignedTo: parseInt(document.getElementById('editTaskAssignee').value),
                priority: document.getElementById('editTaskPriority').value,
                status: document.getElementById('editTaskStatus').value,
                dueDate: document.getElementById('editTaskDueDate').value
            };
            
            localStorage.setItem('tasks', JSON.stringify(tasks));
            
            // إعادة تحميل المهام
            loadAndDisplayTasks();
            closeModal();
            alert('تم تحديث المهمة بنجاح');
        }
        
        // حذف مهمة
        function deleteTask(taskId) {
            if (!confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
                return;
            }
            
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            
            // إعادة تحميل المهام
            loadAndDisplayTasks();
            alert('تم حذف المهمة بنجاح');
        }
        
        // إغلاق المودال
        function closeModal() {
            const modal = document.querySelector('.modal-overlay');
            if (modal) {
                modal.remove();
            }
        }
        
        // تصفية المهام
        function filterTasks() {
            loadAndDisplayTasks();
        }
        
        // إعادة تعيين الفلاتر
        function resetFilters() {
            document.getElementById('taskSearch').value = '';
            document.getElementById('statusFilter').value = '';
            document.getElementById('priorityFilter').value = '';
            loadAndDisplayTasks();
        }
        
        // تهيئة الصفحة
        document.addEventListener('DOMContentLoaded', function() {
            // التحقق من تسجيل الدخول
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                window.location.href = 'login.html';
                return;
            }
            
            // تحميل المهام
            loadAndDisplayTasks();
            
            // إضافة مستمعي الأحداث
            document.getElementById('taskSearch').addEventListener('input', filterTasks);
            document.getElementById('statusFilter').addEventListener('change', filterTasks);
            document.getElementById('priorityFilter').addEventListener('change', filterTasks);
            document.getElementById('resetFilters').addEventListener('click', resetFilters);
            document.getElementById('addTaskBtn').addEventListener('click', showAddTaskModal);
            
            // إغلاق المودال عند النقر خارجها
            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('modal-overlay')) {
                    closeModal();
                }
            });
        });
        
        // إضافة أنماط المودال
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                padding: 20px;
            }
            
            .modal {
                background: white;
                border-radius: 10px;
                width: 100%;
                max-width: 500px;
                max-height: 90vh;
                overflow-y: auto;
                animation: modalFadeIn 0.3s ease;
            }
            
            @keyframes modalFadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h3 {
                margin: 0;
                color: #1a237e;
            }
            
            .close-modal {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .form-group {
                margin-bottom: 1rem;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                color: #333;
                font-weight: 500;
            }
            
            .form-control {
                width: 100%;
                padding: 0.8rem;
                border: 1px solid #ddd;
                border-radius: 8px;
                font-size: 1rem;
            }
            
            .form-control:focus {
                outline: none;
                border-color: #1a237e;
            }
            
            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            
            @media (max-width: 768px) {
                .form-row {
                    grid-template-columns: 1fr;
                }
            }
            
            .modal-footer {
                padding: 1.5rem;
                border-top: 1px solid #eee;
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
            }
        `;
        document.head.appendChild(modalStyles);
    </script>
</body>
</html>
