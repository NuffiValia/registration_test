var StateMap = {	
	main_title: {//заголовок сайта		
		container: "main_title",
		props: [["variant_form", "render-variant", "[name='variant_form']"],["user_name", "text", "[name='user_name']"]],
		methods: {}		
	},
	registr_btns:{ //форма регистрации
			container: "registr_btns",
			props: [ ["registr_form_btn", "click", "[name='registr_form_btn']"],
					 ["atorization_form_btn", "click", "[name='atorization_form_btn']"],					
			],
			methods: {
				registr_form_btn: function(){						
					this.rootLink.state.main_title.props.variant_form.setProp("registr_form"); //меняем отображаемый компонент - пустой div на форму регистрации
				},
				atorization_form_btn: function(){
					this.rootLink.state.main_title.props.variant_form.setProp("autorization_form"); //меняем отображаемый компонент - пустой div на форму авторизации		
				}
			}
	},
	fetchComponents: {//компоненты шаблона
		profile: {//вставка информациии профиля	
			container: "profile",
			props: [["login", "text", "[name='login']"]
			],
			methods: {			
			}		
		},
		registr_form:{ //форма регистрации
			container: "registr_form",
			props: [["name", "inputvalue", "[name='name']"], ["family", "inputvalue", "[name='family']"],
					["login", "inputvalue", "[name='login']"], ["parole", "inputvalue", "[name='parole']"],
					["registr_btn", "click", "[name='registr_btn']"]//, ["registration_form_class", "class", ""]					
			],
			methods: {
				registr_btn: function(){ //кнопка регистрации
					
					var name = this.parent.props.name.getProp(); // получаем данные полей формы
					var family = this.parent.props.family.getProp();
					var login = this.parent.props.login.getProp();
					var parole = this.parent.props.parole.getProp();
					
						if(parole.length < 5 || family.length < 3 || login.length < 2 || login.length < 2){ //проверка валидности
						alert("данные введены некоректно, убедитесь что заполнены все поля");
						return;						
					}					
					event.preventDefault();

					var formData = new FormData();
					formData.append('name', name ); //заполняем данными объект для отправки на сервер
					formData.append('family',family);
					formData.append('login',login);
					formData.append('parole',parole);					

					 var url = "/php/registration.php"
					 var this_ =  this;
					 				 
					this.rootLink.stateMethods.sendPost(url, formData, function(data){ //отправляем данные на сервер
						if(data){ //при отсутствии ошибки отображаем логин пользователя в заголовке и меняем шаблон формы регистрации на шаблон профиля
							alert("пользователь " +data.login + "  регистрация завершена");
							this_.rootLink.state.main_title.props.user_name.setProp(" "+data.name+" "+data.family);
							this_.rootLink.state.main_title.props.variant_form.setProp({componentName: "profile", login: data.login});						
						}else{
							console.log(data);
							alert("ошибка регистрации, возможно неуникальный логин, попробуйте еще раз");							
						}					
					} );					
				}				
			}			
		},
		autorization_form: { //форма авторизации
			container: "autorization_form",
			props: [ ["login", "inputvalue", "[name='login']"], ["parole", "inputvalue", "[name='parole']"],
					["autorization_btn", "click", "[name='autorization_btn']"] //, ["autorization_form_class", "class", ""]					
			],
			methods: {
				autorization_btn: function(){ //кнопка регистрации
					
				    var login = this.parent.props.login.getProp();
					var parole = this.parent.props.parole.getProp();
					event.preventDefault();
					//alert(" "+login+" "+parole);
					
					var formData = new FormData();
					formData.append('login',login);
					formData.append('parole',parole);					

					 var url = "/php/autorization.php"
					 var this_ =  this;
					 				 
					this.rootLink.stateMethods.sendPost(url, formData, function(data){ //отправляем данные на сервер
						if(data){ 
							alert("пользователь " +data.name + " - вход выполнен.");
							this_.rootLink.state.main_title.props.user_name.setProp(" "+data.name+" "+data.family); //отображаем имя и фамилию в заголовке
							this_.rootLink.state.main_title.props.variant_form.setProp({componentName: "profile", login: data.login}); //отображаем логин во вставке профиля
							console.log(data);
						}else{
							console.log(data);
							alert("ошибка авторизации, попробуйте еще раз");							
						}					
					} );
				}
			}	
		}, 
	},
    stateSettings: {	
		templatePath: "./html/template.html" // ссылка на шаблон формы регистрации		
	},
	stateMethods: {		
			sendPost: function(url, formData, callb){ // функция отправки данных на сервер и обработки исключений.
					fetch(url, {						
						method: 'POST',
						body: formData					
					})					
					.then((response) => {
						if(response.ok) {
							//console.log(response);
							try {
								return response.json();
							} catch(e) {
								return false;
							}
						}	
						console.log(response);
						throw new Error('Network response was not ok');
					})
					.then((text) => {
						callb(text);
					})
					.catch((error) => {
							console.log(error);
							alert("ошибка, попробуйте еще раз");
					});		
		}		
	}	
}
window.onload = function(){	
	var HM = new HTMLixState(StateMap);
	console.log(HM); 
}