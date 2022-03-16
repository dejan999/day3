var app = angular.module("Demo", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "Templates/home.html",
                controller: "homeController",
                controllerAs:"homeCtrl"
            })
            .when("/courses", {
                templateUrl: "Templates/courses.html",
                controller: "coursesController as coursesCtrl"
            })
            .when("/students", {
                templateUrl: "Templates/students.html",
                controller: "studentsController as studentsCtrl"
            })


            .when("/students/:id", {
                templateUrl: "Templates/studentDetails.html",
                controller: "studentDetailsController as studentDetailsCtrl"
            })


            .otherwise({
                redirectTo: "/home"
            })
        $locationProvider.html5Mode(true);
    })


    .controller("homeController", function () {
        this.message = "Home page";

    })
    .controller("coursesController", function () {

        this.courses = ["C#", "AngularJS", "Java", "SQL Server", "ASP.NET"];
    })
    .controller("studentsController", function ($http) {
        var vm=this;
        $http.get("https://mysafeinfo.com/api/data?list=presidents&format=json&case=default")
            .then(function (response) {
                vm.students = response.data;
            })
    })


    .controller("studentDetailsController", function ($http, $routeParams) {
        var vm=this;
        $http({
            url: "https://mysafeinfo.com/api/data?list=presidents&format=json&case=default",
            method: "get",
            params: { ID: $routeParams.id }
        }).then(function (response) {
            vm.student = response.data[0];
            
        })
    })     