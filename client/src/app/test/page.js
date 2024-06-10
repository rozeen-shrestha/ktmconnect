'use client'
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMaterialButton, setIsMaterialButton] = useState(false);

  useEffect(() => {
    const inputFocusHandler = () => {
      $(this).parent(".input").each(function() {
        $("label", this).css({
          "line-height": "18px",
          "font-size": "18px",
          "font-weight": "100",
          "top": "0px"
        });
        $(".spin", this).css({
          "width": "100%"
        });
      });
    };

    const inputBlurHandler = () => {
      $(".spin").css({
        "width": "0px"
      });
      if ($(this).val() == "") {
        $(this).parent(".input").each(function() {
          $("label", this).css({
            "line-height": "60px",
            "font-size": "24px",
            "font-weight": "300",
            "top": "10px"
          });
        });
      }
    };

    const buttonClickHandler = (e) => {
      var pX = e.pageX,
        pY = e.pageY,
        oX = parseInt($(this).offset().left),
        oY = parseInt($(this).offset().top);

      $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>');
      $('.x-' + oX + '.y-' + oY + '').animate({
        "width": "500px",
        "height": "500px",
        "top": "-250px",
        "left": "-250px",
      }, 600);
      $("button", this).addClass('active');
    };

    const alt2ClickHandler = () => {
      if (!$(this).hasClass('material-button')) {
        $(".shape").css({
          "width": "100%",
          "height": "100%",
          "transform": "rotate(0deg)"
        });

        setTimeout(function() {
          $(".overbox").css({
            "overflow": "initial"
          });
        }, 600);

        $(this).animate({
          "width": "140px",
          "height": "140px"
        }, 500, function() {
          $(".box").removeClass("back");
          $(this).removeClass('active');
        });

        $(".overbox .title").fadeOut(300);
        $(".overbox .input").fadeOut(300);
        $(".overbox .button").fadeOut(300);

        $(".alt-2").addClass('material-button');
      }
    };

    const materialButtonClickHandler = () => {
      if ($(this).hasClass('material-button')) {
        setTimeout(function() {
          $(".overbox").css({
            "overflow": "hidden"
          });
          $(".box").addClass("back");
        }, 200);
        $(this).addClass('active').animate({
          "width": "700px",
          "height": "700px"
        });

        setTimeout(function() {
          $(".shape").css({
            "width": "50%",
            "height": "50%",
            "transform": "rotate(45deg)"
          });

          $(".overbox .title").fadeIn(300);
          $(".overbox .input").fadeIn(300);
          $(".overbox .button").fadeIn(300);
        }, 700);

        $(this).removeClass('material-button');
      }

      if ($(".alt-2").hasClass('material-buton')) {
        $(".alt-2").removeClass('material-buton');
        $(".alt-2").addClass('material-button');
      }
    };

    $(".input input").focus(inputFocusHandler);
    $(".input input").blur(inputBlurHandler);
    $(".button").click(buttonClickHandler);
    $(".alt-2").click(alt2ClickHandler);
    $(".material-button").click(materialButtonClickHandler);
  }, []);

  return (
    <div className="materialContainer">
      <div className="box">
        <div className="title">LOGIN</div>
        <div className="input">
          <label htmlFor="name">Username</label>
          <input type="text" name="name" id="name" />
          <span className="spin"></span>
        </div>
        <div className="input">
          <label htmlFor="pass">Password</label>
          <input type="password" name="pass" id="pass" />
          <span className="spin"></span>
        </div>
        <div className="button login">
          <button><span>GO</span> <i className="fa fa-check"></i></button>
        </div>
        <a href="" className="pass-forgot">Forgot your password?</a>
      </div>
      <div className="overbox">
        <div className={`material-button alt-2 ${isMaterialButton ? 'active' : ''}`} onClick={() => setIsMaterialButton(!isMaterialButton)}><span className="shape"></span></div>
        <div className="title">REGISTER</div>
        <div className="input">
          <label htmlFor="regname">Username</label>
          <input type="text" name="regname" id="regname" />
          <span className="spin"></span>
        </div>
        <div className="input">
          <label htmlFor="regpass">Password</label>
          <input type="password" name="regpass" id="regpass" />
          <span className="spin"></span>
        </div>
        <div className="input">
          <label htmlFor="reregpass">Repeat Password</label>
          <input type="password" name="reregpass" id="reregpass" />
          <span className="spin"></span>
        </div>
        <div className={`button ${isActive ? 'active' : ''}`} onClick={() => setIsActive(!isActive)}>
          <button><span>NEXT</span></button>
        </div>
      </div>
    </div>
  );
};

export default Page;