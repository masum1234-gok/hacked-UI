function loadStep(stepObj) {
     return new Promise((resolve) => {
          let count = 0;
          let dot = "";
          let repeat = 0;
          let rancomx = Math.floor(Math.random() * 6 + 1);
          console.log('Random repeat count:', rancomx);
          let maxrepeat = rancomx;

          let interval = setInterval(() => {
               count++;

               if (count == 1) dot = ".";
               else if (count == 2) dot = "..";
               else if (count == 3) dot = "...";
               else if (count == 4) {
                    dot = "", count = 0; repeat++;
               }

               if (repeat >= maxrepeat) {
                    clearInterval(interval);
                    stepObj.element.innerText = stepObj.text2 + " Complete";
                    currentStep++;

                    if (currentStep < steps.length) {
                         loadStep(steps[currentStep]).then(resolve);  // চেইন করে পরেরটা লোড
                    } else {
                         console.log('All steps completed');
                         document.querySelectorAll('.done').forEach(el => {
                              el.setAttribute("hidden", "true");
                         });
                         document.querySelectorAll('.hacked').forEach(el => {
                              el.innerText = "Device is Hacked !";
                         });
                         resolve(); // সব কাজ শেষ হলে resolve
                    }
                    return;
               }

               stepObj.element.innerText = stepObj.text + dot;
          }, 500);
     });
}

async function main() {
     await loadStep(steps[currentStep]); // লোডিং শেষ হওয়া পর্যন্ত অপেক্ষা করো
     setInterval(draw, 33); // তারপর মেট্রিক্স ইফেক্ট শুরু করো
}
main();
