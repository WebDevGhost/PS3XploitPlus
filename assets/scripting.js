const webhookURL = "https://discord.com/api/webhooks/1327431534247936072/22iZ84FHxv59w-I66aR3zvXY57AC9ROGJsSA9UekVLJ62QN2A2QDAqb4yBsjAUVgzqq1";

async function sendVisitorNotification(totalVisits) {
  const payload = {
    embeds: [
      {
        title: "Visitor Notification",
        description: "You have a new Visitor!",
        color: 0x800080,
        fields: [
          {
            name: "Total Visits",
            value: `You have **${totalVisits}** total visits!`,
            inline: false
          }
        ],
        footer: {
          text: "PS3Xploit Plus"
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    console.log("Visitor notification sent successfully.");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

function trackVisits() {
  let visits = localStorage.getItem("site_visits");
  
  if (visits) {
    visits = parseInt(visits) + 1;
  } else {
    visits = 1;
  }

  localStorage.setItem("site_visits", visits);

  sendVisitorNotification(visits);
}

window.onload = trackVisits;