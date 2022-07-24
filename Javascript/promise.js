//Bước 1 : khởi tạo biến promise
//Bước 2 : Executor
//Không gọi resolve, reject sẽ xuất hiện Memory leak
//Promise có 3 status :  Pendding (đang chờ xử lý), Fulfilled (thành công), Rejected (thất bại)
var promise = new Promise(
    //Executor
    function(resolve, reject){
    //Logic
    //Thành công : resolve()
    //Thất bại : reject()
    reject()
});

promise
        .then(function(){
            console.log('SUCCESS')
        })

        .catch(function(){
            console.log('FAIL')
        })

        .finally(function(){
            console.log('DONE')
        })

//Ví dụ 1: Sử dụng dữ liệu như API kèm Promise
var users = [
    {
        id: 1,
        name: 'Nguyễn Việt Nam'
    },
    {
        id: 2,
        name: 'Phùng Đề Mạc'
    },
    {
        id: 3,
        name: 'Dương Tử'
    }
];

var comments = [
    {
        id: 1,
        userId: 1,
        content: 'Xin chào các bạn'
    },
    {
        id: 2,
        userId: 2,
        content: 'Oke chào bạn'
    },
    {
        id: 3,
        userId: 3,
        content: 'Chào mừng bạn đã gia nhập'
    }
];

//Bước 1. Lấy comments
//Bước 2. Từ comments lấy ra userId
//Bước 3. Từ userId lấy ra user tương ứng
function getComments(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(comments);
        },1000)
    })
}

function getUsersbyIds(userID){
    return new Promise(function(resolve){
        setTimeout(function(){
            var result = users.filter(function(user){
                return userID.includes(user.id);
            })
            resolve(result);
        },1000)
    })
}

getComments()
   .then(function(comments){
       var userIds = comments.map(function(comment){
           return comment.userId;
       });

       return getUsersbyIds(userIds)
           .then(function(users){
               return {
                   users: users,
                   comments: comments
               };
           });
   })
   .then(function(data){
       console.log(data)
       var commentblock=document.getElementById('box-comment');
       var html='';
       data.comments.forEach(function(comment){
           var user = data.users.find(function(user){
               return user.id === comment.userId;
           });
           html +=`<li>${user.name}: ${comment.content}</li>`
       });
       commentblock.innerHTML=html;
   })

//Ví dụ về Fetch
var postAPIs = 'https://jsonplaceholder.typicode.com/posts';
fetch(postAPIs)
     .then(function(response){
         return response.json();
     })
     .then(function(posts){
         var html = '';
         html = posts.map(function(post){
             return `<li>
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
             </li>`
         })
         var htmls = html.join('');
         document.getElementById('box-comment').innerHTML = html;
     })

var courseAPI = 'http://localhost:3000/courses'

fetch(courseAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(course){
        console.log(course)
    })