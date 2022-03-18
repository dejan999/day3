var app = angular.module("Demo", ["ui.router"])
    .config(function ($stateProvider) {

        //$routeProvider.caseInsensitiveMatch = true;

        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "Templates/home.html",
                controller: "homeController",
                controllerAs: "homeCtrl"
            })
            .state("courses", {
                url: "/courses",
                templateUrl: "Templates/courses.html",
                controller: "coursesController as coursesCtrl",

            })
            .state("students", {
                url: "/students",
                templateUrl: "Templates/students.html",
                controller: "studentsController",
                controllerAs: "vm",
                resolve: {
                    studentslist: function ($http) {
                        return $http.get("https://mysafeinfo.com/api/data?list=presidents&format=json&case=default")
                            .then(function (response) {
                                return response.data;
                            })
                    }
                }
            })
            .state("studentDetails", {
                url: "/students/:id",
                templateUrl: "Templates/studentDetails.html",
                controller: "studentDetailsController as studentDetailsCtrl"
            })

            .state("studentsSearch", {
                url: "/studentsSearch/:name",
                templateUrl: "Templates/studentsSearch.html",
                controller: "studentsSearchController",
                controllerAs: "studentsSearchCtrl"
            })
            
/*
    .otherwise({
         redirectTo: "/home"
     })
    $locationProvider.html5Mode(true);*/

    })
    .controller("homeController", function () {
        this.message = "Home page";

    })
    .controller("coursesController", function () {

        this.courses = ["C#", "AngularJS", "Java", "SQL Server", "ASP.NET"];
    })

    .controller("studentsController", function (studentslist, $state, $location) {
        var vm = this;
    
        vm.studentSearch = function () {
            $state.go("studentsSearch", { FullName: vm.name });
        }
        
        vm.studentDetails = function () {
            $state.go("studentsDetails", { ID: vm.id });
            console.log("myFunction");
        }

        vm.reloadData = function () {
            $state.reload();
        }

    
        vm.students = studentslist;
    })



    .controller("studentDetailsController", function ($http, $stateParams) {
        var vm = this;

        vm.oo = {
            id: 'test'
        }

        
        $http({
            url: "https://mysafeinfo.com/api/data?list=presidents&format=json&case=default",
            method: "get",
            params: { ID: $stateParams.id }
        }).then(function (response) {
            vm.student = response.data;
            
        })

    })
    .controller("studentsSearchController", function ($http, $stateParams) {
        var vm = this;
    
        if ($stateParams.name) {
            $http({
                url: "https://mysafeinfo.com/api/data?list=presidents&format=json&case=default",
                method: "get",
                params: { FullName: $stateParams.name }
            }).then(function (response) {
                vm.students = response.data;
            })
        }
        else {
            $http.get("https://mysafeinfo.com/api/data?list=presidents&format=json&case=default")
                        .then(function (response) {
                            vm.students = response.data;
                        })
        }
    })