// canvas variables
var canvas, canvaswidth, canvasheight, ctrl;

//call canvasElements();
//store height width in 
//above canvas variables
canvasElements();

//here declare 3 array

//1) arr is for store array element 
//2) itmd for store intermediate values
//3) visited is for the element which has been sorted
var arr = [], itmd = [], visited = []


//length of unsorted array
var len_of_arr = 40;

// store random value in arr[]
for (var i = 0; i < len_of_arr; i++) 
{
    arr.push(Math.round(Math.random() * 250) )
}

//intialize itmd and visited array with 0
for (var i = 0; i < len_of_arr; i++) 
{
    itmd.push(0)
    visited.push(0)
}

//merging of two sub array
// https://www.geeksforgeeks.org/merge-two-sorted-arrays/
function mergeArray(start, end)
{

    let mid = parseInt((start + end) >> 1);
    let start1 = start, start2 = mid + 1
    let end1 = mid, end2 = end
    
    // Initial index of merged subarray
    let index = start

    while (start1 <= end1 && start2 <= end2) 
    {
        if (arr[start1] <= arr[start2]) 
        {
            itmd[index] = arr[start1]
            index = index + 1
            start1 = start1 + 1;
        }
        else if(arr[start1] > arr[start2])
        {
            itmd[index] = arr[start2]
            index = index + 1
            start2 = start2 + 1;
        }
    }

    // Copy the remaining elements of
    // arr[], if there are any
    while (start1 <= end1) 
    {
        itmd[index] = arr[start1]
        index = index + 1
        start1 = start1 + 1;
    }

    while (start2 <= end2) 
    {
        itmd[index] = arr[start2]
        index = index + 1
        start2 = start2 + 1;
    }

    index = start
    while (index <= end) 
    {
        arr[index] = itmd[index];
        index++;
    }

}

//function for showing visualization 
//effect
function drawBars(start, end)
{
    //clear pevious unsorted bars
    ctrl.clearRect(0, 0, 1000, 1500)

    //styling of bars
    for (let i = 0; i < len_of_arr; i++) 
    {
        //changing styles of bars
        ctrl.fillStyle = "black"
        ctrl.shadowOffsetX = 2
        ctrl.shadowColor = "chocolate";
        ctrl.shadowBlur = 3;
        ctrl.shadowOffsetY =5;
       
        
        //size of rectangle of bars
        ctrl.fillRect(25 * i, 300 - arr[i], 20, arr[i])
        
        if (visited[i]) 
        {
            ctrl.fillStyle = "#006d13"
            ctrl.fillRect(25 * i, 300 - arr[i], 20, arr[i])
            ctrl.shadowOffsetX = 2
        
        }
    }

    for (let i = start; i <= end; i++) 
    {
        ctrl.fillStyle = "orange"
        ctrl.fillRect(25 * i, 300 - arr[i], 18, arr[i])
        ctrl.fillStyle = "#cdff6c"
        ctrl.fillRect(25 * i,300, 18, arr[i])
        visited[i] = 1
    }

}

//waiting interval between two bars
function timeout(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}


// mergeSorting
const mergeSort = async (start, end) => {

    if (start < end) 
    {
        let mid = parseInt((start + end) >> 1)
        await mergeSort(start, mid)
        await mergeSort(mid + 1, end)
        await mergeArray(start, end)
        await drawBars(start, end)

        //waiting time is 800ms
        await timeout(800)
    }

}
//canvasElemennts function
//for store width and height in
//canvas variable
function canvasElements()
{
    canvas = document.getElementById("Canvas")
    canvas.width = canvas.height = 1000
    canvaswidth = canvas.width
    canvasheight = canvas.height
    ctrl = canvas.getContext("2d")
}

const performer = async () => 
{
    await mergeSort(0, len_of_arr - 1)
    await drawBars()

    //code for change title1 text 
    const title1_changer = document.querySelector(".title1")
    title1_changer.innerText = "Array is completely sorted"
}
performer()

