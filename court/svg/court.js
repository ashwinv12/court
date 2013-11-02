$(document).ready(function () {
	// $("table").tablesort();
	var x = $(window).height();
	console.log(x);
});



'use strict';

var app = window.angular.module('court', []);

app.controller('CourtCtrl', ['$scope',
	function($scope) {

		$scope.players = [
			{
				name: 'Tim',
				color: '#FF0000',
				number: '1',
			},
			{
				name: 'Rhead',
				color: '#00FF00',
				number: '13'
			},
			{
				name: 'Blaine',
				color: '#0000FF',
				number: '27'
			}
		];

		$scope.currentPlayer = 0;

		$scope.setCurrentPlayer = function(index) {
			// console.log(index);
			$scope.currentPlayer = index;
			$scope.highlight = function() {
				$('tr td').addClass('red');
			};
		};
		



	}]);

app.directive('court',
	function() {
		return {
			restrict: 'E',
			templateUrl: 'court.html',
			replace: true,
			controller: function($scope){
				$scope.allshots = [];

				$scope.twosmade = 0;
				$scope.threesmade = 0;
				$scope.shots = 0;
				$scope.threepointshots = 0;

				// $scope.editingMode = false;
				$scope.addingMadeShots = true; 
				$scope.removingShots = false;  
				$scope.showingValues = false;  
				$scope.test = false;  

				// $scope.circleStyle = function() {
				// 	if ($scope.editingMode) {
				// 		return {};
				// 	}
     
				// 	return {
				// 		'pointer-events': 'none'
				// 	};
				// };

				$scope.addCircle = function(value, $event) {
					if (!$scope.removingShots) {
						if ($scope.addingMadeShots) {
							shotMade(value, $event);
						} else {
							shotMissed(value, $event);
						}
					}
					
				}

				var shotMade = function(value, $event) {
						// console.log($event.offsetX + ':' +$scope.width / 100);
						// console.log($scope.height / 100);
						// if ($scope.removeShot) {
						// 	console.log("stuff");
						// 	$scope.removeShot(basket);
						// }
						// else {
						$scope.allshots.push({
							x: $event.offsetX / ($scope.size / 100),
							y: $event.offsetY / ($scope.size / 100),
							color: '#CCFBA8',
							strokeColor: '#87B864',
							value: value,
							type: 'made'
						});
						
						if (value === 2) {
							$scope.twosmade++;
						} else {
							$scope.threesmade++;
							$scope.threepointshots++;
						}
						$scope.shots++;
						// console.log($scope.shots); 
					// }
				};

				var shotMissed = function(value, $event) {
					
						// console.log($event.offsetX + ':' +$scope.width / 100);
						// console.log($scope.height / 100);
						$scope.allshots.push({
							x: $event.offsetX / ($scope.size / 100),
							y: $event.offsetY / ($scope.size / 100),
							color: '#FFB7AA',
							strokeColor: '#FF856F',
							value: value,
							type: 'missed'
						});
						
						if (value === 2) {
							// $scope.twosmade--;
						} else {
							// $scope.threesmade++;
							$scope.threepointshots++;
						}
						$scope.shots++;
					
				};

				$scope.removeShot = function(basket, $event) {

					
					if ($scope.removingShots) {
						$scope.shots--;
						var basketType = basket.type;
						var basketValue = basket.value;
						console.log(basketValue);
						if(basketValue===3) {
							$scope.threepointshots--;
						}
						if (basketType==="made") {
							if(basketValue===3) {
								// $scope.threepointshots--;
								$scope.threesmade--;
							}
							if(basketValue===2) {
								$scope.twosmade--;
							}
						}
						
						$scope.allshots.forEach(function(b, i) {
							if (b === basket) {
								$scope.allshots.splice(i , 1);
								return;
							}
							
						});
					} else {
						$scope.addCircle(basket.value, $event);
					} 
				};
				// $scope.padjenIsMean = function() {
				// 	console.log("yes, he is mean");
				// }
				// $scope.circleClicked = function(value, $event, basket) {
				// 	if ($scope.removeShots) {
				// 		addCircle(value, $event);
				// 	}
				// 	else {
				// 		removeShot(basket);
				// 	}
				// }



			},
			compile: function() {

				return function(scope, elem, attr) {
					scope.size = attr.size || 100;
					// scope.height = attr.height || 100;
					// console.log(scope.width);
					// console.log(scope.height);
				}
			}
		};
	}
);