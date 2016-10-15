var appModule = (function() {
	var playerpiece = "";
	var computerpiece = "";
	var gamewon = false;
	var maxmoves = 9;

	$( 'body' ).showlightbox();
  $( '#selection-lightbox').fadeIn();

	var gameboard = {
		1: "", 2: "", 3: "",
		4: "", 5: "", 6: "",
		7: "", 8: "", 9: ""
	}

	$( '#X' ).click(function() {
		playerpiece = "X";
		computerpiece = "O";

		$( 'body' ).closelightbox();

		var playGame = function() {
			if ( maxmoves >= 1 ) {
				playerMove(playerpiece);
				maxmoves--;

				setTimeout(function() {
					computerMove(playerpiece, computerpiece);
					maxmoves--;
				}, 5000);

				return setTimeout(function() {
					playGame();
					console.log(maxmoves);
				}, 5000)
			}
			else {
				broadcast_tie();
			}
		};

		playGame();
	});


	$( '#O' ).click( function() {
		playerpiece = "O";
		computerpiece = "X";

		$( 'body' ).closelightbox();

        var playGame = function() {
  		    if ( maxmoves >= 1 ) {
				setTimeout(function() {
	  			computerMove(playerpiece, computerpiece);
					maxmoves--;
	  			}, 5000);

				playerMove( playerpiece );
				maxmoves--;

				return setTimeout(function() {
  				playGame()
  				}, 5000);
        }
		    else {
                broadcast_tie();
            }
		}

  		playGame();
	});

	function playerMove( playerpiece ) {
		$( '.column' ).click(function( e ){
			var boxValue = $( this );
			if ( boxValue.text() === "" ) {
				$( this ).text( playerpiece );
				gameboard[boxValue.attr( "id" )] = playerpiece;
				determineWinner( playerpiece );
			}
		});
	}

	function placeComputerPiece(box, computerpiece) {
  	gameboard[box] = computerpiece;
		$('#' + box).text( computerpiece );
		determineWinner( computerpiece );
	}

	function computerMove(pp, cp) {
		var cmove = computerWin(cp);
		if (cmove === 0)
			cmove = computerBlock(pp);
		if (cmove === 0) {
			cmove = randomComputerMove();
			if (gameboard[cmove] !== "")
				return computerMove(pp, cp);
		}

		placeComputerPiece(cmove, cp);
	}

	function randomComputerMove() {
		var min = Math.ceil(1);
		var max = Math.floor(9);

		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function determineWinner( gamepiece ) {
		var winner = false;

		var row1 = (gameboard[1] === gamepiece && gameboard[2] === gamepiece) && gameboard[3] === gamepiece;
		var row2 = (gameboard[4] === gamepiece && gameboard[5] === gamepiece) && gameboard[6] === gamepiece;
		var row3 = (gameboard[7] === gamepiece && gameboard[8] === gamepiece) && gameboard[9] === gamepiece;

		var col1 = (gameboard[1] === gamepiece && gameboard[4] === gamepiece) && gameboard[7] === gamepiece;
		var col2 = (gameboard[2] === gamepiece && gameboard[5] === gamepiece) && gameboard[8] === gamepiece;
		var col3 = (gameboard[3] === gamepiece && gameboard[6] === gamepiece) && gameboard[9] === gamepiece;

		var dia1 = (gameboard[1] === gamepiece && gameboard[5] === gamepiece) && gameboard[9] === gamepiece;
		var dia2 = (gameboard[3] === gamepiece && gameboard[5] === gamepiece) && gameboard[7] === gamepiece;

    if (row1 || row2 || row3 || col1 || col2 || col3 || dia1 || dia2) {
      $( '#winner-lightbox > div > h1' ).text( gamepiece + " has won!" );

      $( 'body' ).showlightbox();
      $( '#winner-lightbox' ).fadeIn();

			setTimeout(reset_game, 2000);
    }
	}

	function broadcast_tie() {
		$( '#winner-lightbox > div > h1' ).text( "It's a tie!" );

		$( 'body' ).showlightbox();
		$( '#winner-lightbox' ).fadeIn();

		setTimeout(reset_game, 2000);
	}

	function computerBlock(playerpiece, computerpiece) {
		var box = 0;
		// Row 1 block
		if (gameboard[1] === playerpiece && gameboard[2] === playerpiece) {
			gameboard[3] === "" ? box = 3 : box = 0;
		}
		if (gameboard[1] === playerpiece && gameboard[3] === playerpiece) {
			gameboard[2] === "" ? box = 2 : box = 0;
		}
		if (gameboard[2] === playerpiece && gameboard[3] === playerpiece) {
			gameboard[1] === "" ? box = 1 : box = 0;
		}

		// Row 2 block
		if (gameboard[4] === playerpiece && gameboard[5] === playerpiece) {
			gameboard[6] === "" ? box = 6 : box = 0;
		}
		if (gameboard[4] === playerpiece && gameboard[6] === playerpiece) {
			gameboard[5] === "" ? box = 5 : box = 0;
		}
		if (gameboard[5] === playerpiece && gameboard[6] === playerpiece) {
			gameboard[4] === "" ? box = 4 : box = 0;
		}

		// Row 3 block
		if (gameboard[7] === playerpiece && gameboard[8] === playerpiece){
			gameboard[3] === "" ? box = 3 : box = 0;
		}
		if (gameboard[7] === playerpiece && gameboard[9] === playerpiece){
			gameboard[8] === "" ? box = 8 : box = 0;
		}
		if (gameboard[8] === playerpiece && gameboard[9] === playerpiece){
			gameboard[7] === "" ? box = 7 : box = 0;
		}

		// Column 1 block
		if (gameboard[1] === playerpiece && gameboard[4] === playerpiece){
			gameboard[7] === "" ? box = 7 : box = 0;
		}
		if (gameboard[1] === playerpiece && gameboard[7] === playerpiece){
			gameboard[4] === "" ? box = 4 : box = 0;
		}
		if (gameboard[4] === playerpiece && gameboard[7] === playerpiece){
			gameboard[1] === "" ? box = 1 : box = 0;
		}

		// Column 2 block
		if (gameboard[2] === playerpiece && gameboard[5] === playerpiece){
			gameboard[8] === "" ? box = 8 : box = 0;
		}
		if (gameboard[2] === playerpiece && gameboard[8] === playerpiece){
			gameboard[5] === "" ? box = 5 : box = 0;
		}
		if (gameboard[5] === playerpiece && gameboard[8] === playerpiece){
			gameboard[2] === "" ? box = 2 : box = 0;
		}

		// Column 3 block
		if (gameboard[3] === playerpiece && gameboard[6] === playerpiece){
			gameboard[9] === "" ? box = 9 : box = 0;
		}
		if (gameboard[3] === playerpiece && gameboard[9] === playerpiece){
			gameboard[6] === "" ? box = 6 : box = 0;
		}
		if (gameboard[6] === playerpiece && gameboard[9] === playerpiece){
			gameboard[3] === "" ? box = 3 : box = 0;
		}

		// Diagonal 1 block
		if (gameboard[1] === playerpiece && gameboard[5] === playerpiece){
			gameboard[9] === "" ? box = 9 : box = 0;
		}
		if (gameboard[1] === playerpiece && gameboard[9] === playerpiece){
			gameboard[5] === "" ? box = 5 : box = 0;
		}
		if (gameboard[5] === playerpiece && gameboard[9] === playerpiece){
			gameboard[1] === "" ? box = 1 : box = 0;
		}

		// Diagonal 2 block
		if (gameboard[3] === playerpiece && gameboard[5] === playerpiece){
			gameboard[7] === "" ? box = 7 : box = 0;
		}
		if (gameboard[3] === playerpiece && gameboard[7] === playerpiece){
			gameboard[5] === "" ? box = 5 : box = 0;
		}
		if (gameboard[5] === playerpiece && gameboard[7] === playerpiece){
			gameboard[3] === "" ? box = 3 : box = 0;
		}

		return box;
	}

	function computerWin(computerpiece) {
		var box = 0;
		// Row 1 win
		if (gameboard[1] === computerpiece && gameboard[2] === computerpiece){
			gameboard[3] === "" ? box = 3 : box = 0;
		}
		if (gameboard[1] === computerpiece && gameboard[3] === computerpiece){
			gameboard[2] === "" ? box = 2 : box = 0;
		}
		if (gameboard[2] === computerpiece && gameboard[3] === computerpiece){
			gameboard[1] === "" ? box = 1 : box = 0;
		}

		// Row 2 win
		if (gameboard[4] === computerpiece && gameboard[5] === computerpiece){
			gameboard[6] === "" ? box = 6 : box = 0;
		}
		if (gameboard[4] === computerpiece && gameboard[6] === computerpiece){
			gameboard[5] === "" ? box = 5 : box = 0;
		}
		if (gameboard[5] === computerpiece && gameboard[6] === computerpiece){
			gameboard[4] === "" ? box = 4 : box = 0;
		}

		// Row 3 win
		if (gameboard[7] === computerpiece && gameboard[8] === computerpiece){
			gameboard[9] === "" ? box = 9 : box = 0;
		}
		if (gameboard[7] === computerpiece && gameboard[9] === computerpiece){
			gameboard[8] === "" ? box = 8 : box = 0;
		}
		if (gameboard[8] === computerpiece && gameboard[9] === computerpiece){
			gameboard[7] === "" ? box = 7 : box = 0;
		}

		// Column 1 win
		if (gameboard[1] === computerpiece && gameboard[4] === computerpiece){
			gameboard[7] === "" ? box = 7 : box = 0;
		}
		if (gameboard[1] === computerpiece && gameboard[7] === computerpiece){
			gameboard[4] === "" ? box = 4 : box = 0;
		}
		if (gameboard[4] === computerpiece && gameboard[7] === computerpiece){
			gameboard[1] === "" ? box = 1 : box = 0;
		}

		// Column 2 win
		if (gameboard[2] === computerpiece && gameboard[5] === computerpiece){
			gameboard[8] === "" ? box = 8 : box = 0;
		}
		if (gameboard[2] === computerpiece && gameboard[8] === computerpiece){
			gameboard[5] === "" ? box = 5 : box = 0;
		}
		if (gameboard[5] === computerpiece && gameboard[8] === computerpiece){
			gameboard[2] === "" ? box = 2 : box = 0;
		}

		// Column 3 win
		if (gameboard[3] === computerpiece && gameboard[6] === computerpiece){
			gameboard[9] === "" ? box = 9 : box = 0;
		}
		if (gameboard[3] === computerpiece && gameboard[9] === computerpiece){
			gameboard[6] === "" ? box = 6 : box = 0;
		}
		if (gameboard[6] === computerpiece && gameboard[9] === computerpiece){
			gameboard[3] === "" ? box = 3 : box = 0;
		}

		// Diagonal 1 win
		if (gameboard[1] === computerpiece && gameboard[5] === computerpiece){
			gameboard[9] === "" ? box = 9 : box = 0;
		}
		if (gameboard[1] === computerpiece && gameboard[9] === computerpiece){
			gameboard[5] === "" ? box = 5 : box = 0;
		}
		if (gameboard[5] === computerpiece && gameboard[9] === computerpiece){
			gameboard[1] === "" ? box = 1 : box = 0;
		}

		// Diagonal 2 win
		if (gameboard[3] === computerpiece && gameboard[5] === computerpiece){
			gameboard[7] === "" ? box = 7 : box = 0;
		}
		if (gameboard[3] === computerpiece && gameboard[7] === computerpiece){
			gameboard[5] === "" ? box = 5 : box = 0;
		}
		if (gameboard[5] === computerpiece && gameboard[7] === computerpiece){
			gameboard[3] === "" ? box = 3 : box = 0;
		}

		return box;
	}

	function reset_game(){
		location.reload();
	}
}())
