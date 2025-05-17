<?php


echo <<<HTML

<!DOCTYPE html>
<html lang="ru">
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="./assets/bootstrap.min.css">
<style type="text/css"> 
</style>
</head>
	<body>
		<div data-main_title="container" class="container-fluid" >
			<div class="row main-row">
				<div  class="col-12 col-sm-12 col-md-12 col-lg-12" id="container">
				<p> Добро пожаловать на сайт! <span style="color: green;"  name="user_name"> </span></p>
				<div data-registr_btns="container" name="registr_form_class">													
					<button type="button"  name="registr_form_btn" class="btn btn-success btn-sm" title="регистрация на сайте">Sig up</button>
					
					<button type="button"  name="atorization_form_btn" class="btn btn-info btn-sm" title="авторизация на сайте">Sig in</button>
				</div>
				
				<div name="variant_form">

				</div>
				</div><!-- end col-12 -->
			</div><!-- end main-row -->
		</div><!-- end container-fluid -->
	</body>
	
	<script src="./assets/htmlix.js"></script>
	<script src="./js/main.js"></script>
</html>

HTML;


?>