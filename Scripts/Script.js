var app = angular.module("Demo", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "Templates/home.html",
                controller: "homeController"
            })
            .when("/courses", {
                templateUrl: "Templates/courses.html",
                controller: "coursesController"
            })
            .when("/students", {
                templateUrl: "Templates/students.html",
                controller: "studentsController"
            })


            .when("/students/:id", {
                templateUrl: "Templates/studentDetails.html",
                controller: "studentDetailsController"
            })


            .otherwise({
                redirectTo: "/home"
            })
        $locationProvider.html5Mode(true);
    })


    .controller("homeController", function ($scope) {
        $scope.message = "Home page";

    })
    .controller("coursesController", function ($scope) {

        $scope.courses = ["C#", "AngularJS", "Java", "SQL Server", "ASP.NET"];
    })
    .controller("studentsController", function ($scope, $http) {
        $http.get("https://mysafeinfo.com/api/data?list=presidents&format=json&case=default")
            .then(function (response) {
                $scope.students = response.data;
            })
    })


    .controller("studentDetailsController", function ($scope, $http, $routeParams) {
        
        $http({
            url: "https://mysafeinfo.com/api/data?list=presidents&format=json&case=default",
            method: "get",
            params: { ID: $routeParams.id }
        }).then(function (response) {
            $scope.student = response.data[0];
            
        })
    })     