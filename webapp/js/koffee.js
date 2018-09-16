/*global TopKoffee _config*/

var TopKoffee = window.TopKoffee || {};

(function topKoffeeWrapper($){
    let authToken;

    TopKoffee.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });

    function addKoffee() {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/koffee',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                // PickupLocation: {
                //     Latitude: pickupLocation.latitude,
                //     Longitude: pickupLocation.longitude
                // }
            }),
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your unicorn:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(result) {
        console.log('Request completed: ' , result);
    }

    function handleAddKoffeeClick(event) {
        addKoffee();
    }

     // Register click handler for #add_koffe button
     $(function onDocReady() {
        $('#add_koffee').click(handleAddKoffeeClick);
        

        TopKoffee.authToken.then(function updateAuthMessage(token) {
            if (token) {
                console.log('You are authenticated.');
            }
        });

        if (!_config.api.invokeUrl) {
            console.log("No API!");
        }
    });


}(jQuery));
