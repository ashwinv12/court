// $(document).ready(function () {
// 	// $("table").tablesort();     
// });



'use strict';

var app = window.angular.module('court', []);

app.controller('CourtCtrl', ['$scope',
	function($scope) {

		$scope.players = [
			{
				name: 'Tim',
				color: '#FF0000',
				number: '1',
				twos: '0'
			},
			{
				name: 'Rhead',
				color: '#00FF00',
				number: '13',
				twos: '0'
			},
			{
				name: 'Blaine',
				color: '#0000FF',
				number: '27',
				twos: '0'
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
				$scope.baskets = [];
				$scope.missedShots = [];
				$scope.removedShots = [];

				$scope.twos = 0;
				$scope.threes = 0;
				$scope.shots = 0;
				$scope.threepointshots = 0;

				// $scope.editingMode = false;
				$scope.addingMadeShots = true; 
				$scope.removingShots = false; 

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
						$scope.baskets.push({
							x: $event.offsetX / ($scope.size / 100),
							y: $event.offsetY / ($scope.size / 100),
							color: '#CCFBA8',
							strokeColor: '#87B864',
							value: value
						});
						
						if (value === 2) {
							$scope.twos++;
						} else {
							$scope.threes++;
							$scope.threepointshots++;
						}
						$scope.shots++;
						// console.log($scope.shots); 
					// }
				};

				var shotMissed = function(value, $event) {
					
						// console.log($event.offsetX + ':' +$scope.width / 100);
						// console.log($scope.height / 100);
						$scope.missedShots.push({
							x: $event.offsetX / ($scope.size / 100),
							y: $event.offsetY / ($scope.size / 100),
							color: '#FFB7AA',
							strokeColor: '#FF856F',
							value: value
						});
						
						if (value === 2) {
							// $scope.twos--;
						} else {
							// $scope.threes++;
							$scope.threepointshots++;
						}
						$scope.shots++;
					
				};
				$scope.makeMissed = function(basket) {
					if ($scope.editingMode) {
						$scope.baskets.forEach(function(b, i) {
							if (b === basket) {
								$scope.baskets.splice(i , 1);
								return;
							}
						});

						$scope.missedShots.push(basket);


						if (basket.value === 2) {
							$scope.twos--;
						} else {
							$scope.threes--;
						}
					}
				};

				$scope.removeShot = function(basket, $event) {

					
					if ($scope.removingShots) {
						// console.log("inside first if")
						console.log("Original shots" + $scope.shots);
						$scope.shots--;
						console.log("New shots" + $scope.shots);	
						if(basket.value===3) {
							$scope.threepointshots--;
						}
						if(basket.value===2) {
							$scope.twos--;
						}
						$scope.baskets.forEach(function(b, i) {
							if (b === basket) {
								// console.log("inside second if");
								$scope.baskets.splice(i , 1);
								return;
							}
							
						});
						$scope.missedShots.forEach(function(b, i) {
							if (b === basket) {
								// console.log("inside second if");
								$scope.missedShots.splice(i , 1);
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