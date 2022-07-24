//Mảng mẫu
var courses=[
    'Javascript',
    'PHP',
    'Ruby'
];

var courses2=[
    {
        name:'Javascript',
        coin:680
    },
    {
        name:'PHP',
        coin:860
    },
    {
        name:'Ruby',
        coin:980
    }
];

var courses3=[
    {
        name:'Javascript',
        coin:680,
        isFinish:true
    },
    {
        name:'PHP',
        coin:860,
        isFinish:false
    },
    {
        name:'Ruby',
        coin:980,
        isFinish:false
    },
];

//REDUCE
var inputs=[1, 2, 'hi', 3];
function sumNumbers(inputs) {
    var output=inputs.reduce(function(input, currentvalue){
        // console.log(currentvalue, input)
        if(Number.isInteger(currentvalue))
        {
            input=currentvalue+input;
        }
        return input;
    },0);
}

//Flat - "Làm phẳng" mảng từ Depth array - "Mảng sâu"
var depthArray=[1, 2, [3, 4], 5, 6, [7,8,9]];
var flatArray=depthArray.reduce(function(flatOutput, depthItem){
    return flatOutput.concat(depthItem);
},[])
// console.log(flatArray)

//Lấy ra các khóa học đưa vào mảng mới
var topics=[
    {
        topic: "Front-end",
        courses:[
            {
                id:1,
                title:"HTML, CSS"
            },
            {
                id:2,
                title:"Javascript"
            }
        ]
    },
    {
        topic: "Back-end",
        courses:[
            {
                id:1,
                title:"NodeJS"
            },
            {
                id:2,
                title:"PHP"
            }
        ]
    }
]
var newCourses=topics.reduce(function(course, topic){
    return course.concat(topic.courses);
},[])
// console.log(newCourses)

//Tự tạo hàm reduce2 có truyền initialValue
Array.prototype.reduce2=function(callback, initialValue){
    for(let i=0;i<this.length;i++)
    {
        initialValue=callback(initialValue, this[i],i,this);
    }
    return initialValue;
}

//Tự tạo hàm reduce2 không truyền initialValue
Array.prototype.reduce2=function(callback, initialValue){
    if(arguments.length<2)
    {
        initialValue=this[0];
        for(let i=1;i<this.length;i++)
        {
            initialValue=callback(initialValue, this[i],i,this);
        }
    }
    else
    {
        for(let i=0; i<this.length;i++)
        {
            initialValue=callback(initialValue,this[i], i, this);
        }
    }
    return initialValue;
}

//Tạo hàm map2
Array.prototype.map2=function(callback){
    var output=[],
    arrayLength=this.length;
    for(let i=0; i<arrayLength; i++)
    {
        var result=callback(i,this[i]);
        output.push(result);
    }
    return output;
}

//Tạo hàm find2
Array.prototype.find2=function(callback){
    var arrayLength=this.length;
    var result;
    var output=[];
    for(var index in this)
    {
        if(this.hasOwnProperty(index)){
            result=callback(this[index], index, this);
            if(result){
                output.push(index);
                break;
            }
        }
    }
    return output;
}

var findCourse=courses.find2(function(course, index, array){
    return course==='PHP';
});

//Tạo hàm forEach2
Array.prototype.forEach2=function(callback){
    for(var index in this)
    {
        if(this.hasOwnProperty(index))
        {
            callback(index, this[index], this);
        }
    }
}

courses.forEach2(function(course, index, array){
    // console.log(course, index, array)
});

//Tạo hàm filter2
Array.prototype.filter2=function(callback){
    var output=[];
    for(var index in this)
    {
        if(this.hasOwnProperty(index)){
            var result=callback(this[index], index, this);
            if(result){
                output.push(this[index]);
            }
        }
    }
    return output;
}

var filterCourses=courses2.filter2(function(course,index,array){
    return course.coin>700;
});

//Tạo hàm some2
Array.prototype.some2=function(callback){
    for(var index in this){
        if(this.hasOwnProperty(index)){
            var result=callback(this[index], index, this);
            if(result)
            {
                return true;
            }
        }
    }
    return false;
}

var someCourse=courses3.some2(function(course, index, array){
    return course.isFinish===true;
});

//Tạo hàm every2
Array.prototype.every2=function(callback){
    for(var index in this){
        if(this.hasOwnProperty(index)){
            var result=callback(this[index],index, this);
            if(!result){
                return false;
            }
        }
    }
    return true;
}

var everyCourse=courses3.every2(function(course, index, array){
    return course.isFinish===true;
})