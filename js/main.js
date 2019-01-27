function pad(num, len) {
    return Array(len + 1 - num.toString().length).join('0') + num;
}

let backgroundBool, backgroundUrl, backgroundColor;
window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {


        if (properties.backgroundBool) {
            backgroundBool = properties.backgroundBool.value;
            if (backgroundBool) {
                $('body').css('background', backgroundUrl);
            } else if (!backgroundBool) {
                $('body').css('background', 'rgb(' + backgroundColor + ')');
            }
        }

        
        if (backgroundBool == false && properties.backgroundColor) {
            backgroundColor = properties.backgroundColor.value.split(' ');
            backgroundColor = backgroundColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            $('body').css('background', 'rgb(' + backgroundColor + ')');
        }

        if (backgroundBool && properties.backgroundUrl) {
            backgroundUrl = `url(${properties.backgroundUrl.value}) no-repeat center`;
            $('body').css('background', backgroundUrl);
        }
    }
};

$( document ).ready(function() {
    let curTime = new Date();
    let hour, minute, second, timehalf;
    setInterval(function() {
        curTime = new Date();
        hour = curTime.getHours();
        minute = curTime.getMinutes();
        second = curTime.getSeconds();
        timehalf = "10";
        console.log(curTime);
        if (hour > 12) {
            hour -= 12;
            timehalf = "01";
        }

        $('#hour > li:first-child').html(pad(hour, 2));
        $('#minute > li:first-child').html(pad(minute, 2));
        $('#second > li:first-child').html(pad(second, 2));

        let e=0;
        $('#time-half > li').each(function() {
            if (timehalf[e] == '1')
                $(this).addClass('active');
            else
                $(this).removeClass('active');
            e++;
        });
        e=0;
        $('#hour > li:not(:first-child)').each(function() {
           if (hour.toString(2)[e] == '1')
               $(this).addClass('active');
           else
               $(this).removeClass('active');
           e++;
        });
        e=0;
        $('#minute > li:not(:first-child)').each(function() {
            if (pad(minute.toString(2), 6)[e] == '1')
                $(this).addClass('active');
            else
                $(this).removeClass('active');
            e++;
        });
        e=0;
        $('#second > li:not(:first-child)').each(function() {
            if (pad(second.toString(2), 6)[e] == '1')
                $(this).addClass('active');
            else
                $(this).removeClass('active');
            e++;
        });
    }, 500);
});
