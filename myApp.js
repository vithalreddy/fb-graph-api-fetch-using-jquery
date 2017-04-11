$(document).ready(function() {

    $('#mainbox').hide();
    $('.card').hide();


    var userFacebookToken = 'EAACEdEose0cBAGzLNv61xkzVpf15HZACYJYvsS1YRcJuK8AXigmQuZChZBVqNq8Hbk4MUpTvJIvsr574Bq8vCkRoOVPipPoYt7SZBw8grBIM8N94ZCXAH2odnOWZBiG3zZAElFZBC5gZA5KZCfoeCvHFtZBcOxjxwnXjpXZA2k8ZAnZCGnzCkOw0wBROOLf5IRvjuxPSQZD';

    function getFacebookInfo() {

        $.ajax('https://graph.facebook.com/me?fields=id,name,picture,hometown,gender,email,feed.include_hidden(true).limit(10),location&access_token=' + userFacebookToken, {
                success: function(response) {
                    console.log(response);
                    $("#myFirstName").text(response.first_name);
                    $("#myLastName").text(response.last_name);
                    $("#myFbName").text(response.name);
                    $("#myEmail").text(response.email);
                    $("#myHomeTown").text(response.hometown.name);
                    $("#myLocation").text(response.location.name);
                    $("#myGender").text(response.gender);
                    $("#myProfilePic").html('<img src="https://graph.facebook.com/' + response.id + '/picture"  />');
                    $("#myProfilePicLarge").html('<img src="https://graph.facebook.com/' + response.id + '/picture?type=large"  id="myDpx"/>');
                    $("#myProfileId").html('<a target="blank" href="https://facebook.com/' + response.id + '">https://facebook.com/' + response.id + '</a>');

                    var jData = response.feed.data;
                    var html = "";
                    html += "<div class='fbFeed'>" + "<ul>";
                    $.each(jData, function(index, value) {
                        if (value.id != undefined) {
                            html += "<li>" + "<div class='row'>";
                            html += '<div class="col-md-4">' + '<img src="https://graph.facebook.com/' + response.id + '/picture" class="avatar" />';
                            html += "<h3>" + '<a target="blank" href="https://facebook.com/' + response.id + '">' + response.name + '</a>' + "</h3>" + '</div>';
                            html += '<div class="col-md-8">';
                            if (response.feed.data[index].picture != undefined && response.feed.data[index].type != "link") {
                                html += '<img src="' + response.feed.data[index].picture + '" class="postPic" />';
                            }
                            if (response.feed.data[index].message != undefined) {
                                html += '<p class="message">' + value.message + '</p>';
                            }
                            if (response.feed.data[index].link != undefined && response.feed.data[index].name != undefined) {
                                html += '<a target="blank" href="' + response.feed.data[index].link + '">' + response.feed.data[index].name + '</a>';
                            }
                            html += ' </div>' + '</div>' + "</li><hr>";
                        }
                    });
                    html += "</ul>" + "</div>";
                    $(".fbFeed").append(html);

                },
                error: function(request, errorType, errorMessage) {
                    console.log(request);
                    console.log(errorType);
                    alert(errorType, errorMessage)
                },
                timeout: 3000,
                beforeSend: function() {
                    $('#mainbox').hide();
                    $('.card').hide();


                },
                complete: function() {
                    $('#mainbox').show();
                    $('.card').show();





                }
            } //end argument list



        ); // end ajax call


    } // end get facebook info

    $("#facebookBtn").on('click', getFacebookInfo)



});
