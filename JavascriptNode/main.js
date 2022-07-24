var courseAPI = 'http://localhost:3000/courses';
function start(){
    var cancelBtn = document.querySelector('#cancel');
    cancelBtn.style.display = 'none';
    var updateBtn = document.querySelector('#update');
    updateBtn.style.display = 'none';
    getCourses(renderCourses);
    handleCreate();
};
start();

//Functions
function getCourses(callback){
    fetch(courseAPI)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function createCourse(data, callback){
    var options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body : JSON.stringify(data)
    };
    fetch(courseAPI, options)
        .then(function(response){
            response.json();
        })
        .then(callback);
        
}

function handleDeleteCourse(id){
    var options = {
        method : 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(courseAPI + '/' +id, options)
        .then(function(response){
            response.json();
        })
        .then(function(){
            var courseItem = document.querySelector('.course-item-'+id);
            if(courseItem){
                courseItem.remove();
            }
        });
}

function UpdateCourse(data, id, callback){
    var options = {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    };
    fetch(courseAPI + '/' +id, options)
        .then(function(response){
            response.json();
        })
        .then(callback)
}

function renderCourses(courses){
    var listCourseBlock = document.querySelector('#list-courses');
    var html = courses.map(function(course){
        return `
        <li class="course-item-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick="handleDeleteCourse(${course.id})">XÓA</button>
            <button onclick="handleUpdate(${course.id})">SỬA LẠI</button>
        </li>`;
    });
    listCourseBlock.innerHTML = html.join('');
}

function handleCreate(){
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formData = {
            name : name,
            description : description,
        }
        createCourse(formData, function(){
            getCourses(renderCourses);
        });
        
    }
}

function handleUpdate(id){
    var createBtn = document.querySelector('#create');
    createBtn.style.display = 'none';
    var cancelBtn = document.querySelector('#cancel');
    cancelBtn.style.display = 'block';
    var updateBtn = document.querySelector('#update');
    updateBtn.style.display = 'block';
    document.querySelector('input[name="name"]').value = document.querySelector('.course-item-'+id+'>h4').innerHTML;;
    document.querySelector('input[name="description"]').value = document.querySelector('.course-item-'+id+'>p').innerHTML;
    var updateBtn = document.querySelector('#update');
    updateBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formData = {
            name : name,
            description : description
        }
        UpdateCourse(formData, id, function(){
            getCourses(renderCourses)
        })
    }
}

function handleCancel(){
    var cancelBtn = document.querySelector('#cancel');
    var createBtn = document.querySelector('#create');
    var updateBtn = document.querySelector('#update');
    updateBtn.style.display = 'none';
    createBtn.style.display = 'block';
    cancelBtn.style.display = 'none';
    document.querySelector('input[name="name"]').value='';
    document.querySelector('input[name="description"]').value = '';
}