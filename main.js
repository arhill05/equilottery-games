(() => {
  const gridsData = [
    {
      title: "Win Place Show ®",
      eventSizeLabel: "Field Size",
      eventSizeValue: "10",
      prizes: [
        { payout: "$2,000", odds: "720 to 1" },
        { payout: "$100", odds: "144 to 1" },
        { payout: "free ticket", odds: "35 to 1" }
      ],
      overallOdds: "2 to 1 - 8 to 1*",
      note: "* Odds fluctuate depending on the field size"
    },
    {
      title: "Team Sports",
      eventSizeLabel: "Contests",
      eventSizeValue: "10",
      prizes: [
        { payout: "$1,000", odds: "1,024 to 1" },
        { payout: "$100", odds: "102 to 1" },
        { payout: "$10", odds: "23 to 1" },
        { payout: "free ticket", odds: "8.5 to 1" }
      ],
      overallOdds: "6 to 1"
    },
    {
      title: "Race Car Cash™",
      eventSizeLabel: "Cars1st ",
      eventSizeValue: "40",
      prizes: [
        { payout: "$50,000", odds: "59,280 to 1" },
        { payout: "$7,500", odds: "11,856 to 1" },
        { payout: "$200", odds: "267 to 1" },
        { payout: "$10", odds: "14 to 1" },
        { payout: "$5", odds: "14 to 1" }
      ],
      overallOdds: "7 to 1"
    },
    {
      title: "Golfing for Gold™",
      eventSizeLabel: "Cars1st ",
      eventSizeValue: "40",
      prizes: [
        { payout: "$2,000,000", odds: "3,723,720 to 1" },
        { payout: "$500,000", odds: "744,744 to 1" },
        { payout: "$2,500", odds: "4,056 to 1" },
        { payout: "$35", odds: "53 to 1" },
        { payout: "$5", odds: "11 to 1" }
      ],
      overallOdds: "9 to 1"
    }
  ];

  const titleConstructor = title =>
    `<div class="title">
    <h2>${title}</h2>
    <h2>Odds of Winning</h2>
  </div>`;

  const overallOddsConstructor = overallOdds =>
    `<div class="overall-odds">
    <div class="overall-odds__header">Overall Odds</div>
    <div class="overall-odds__content">${overallOdds}</div>
  </div>`;

  const eventSizeConstructor = (eventSizeLabel, eventSizeValue) =>
    `<div class="event-size">
    <h3 class="event-size__label">${eventSizeLabel}</h3>
    <h2 class="event-size__value">${eventSizeValue}</h2>
  </div>`;

  const getPayoutLabel = prizeIndex =>
    prizeIndex === 0 ? "Payout <br />(avg.)" : "Payout";

  const getLastDigit = number => {
    const numberString = number.toString();
    const lastDigit = numberString.split("")[numberString.length - 1];
    return Number(lastDigit);
  };
  const getPrizeHeader = prizeIndex => {
    prizeIndex++; // increment by 1 so it isn't 0 based
    const lastDigit = getLastDigit(prizeIndex);
    let result = "";
    switch (lastDigit) {
      case 1:
        result = "1st";
        break;
      case 2:
        result = "2nd";
        break;
      case 3:
        result = "3rd";
        break;
      default:
        result = `${lastDigit}th`;
        break;
    }

    result += " Place";

    return result;
  };

  const prizeConstructor = (prevPrize, currentPrize, index, array) =>
    (prevPrize += `<div class="prize-section">
    <div class="prize-section__header">${getPrizeHeader(index)}</div>
    <div class="prize-section__content">
      <span class="prize-section__label">${getPayoutLabel(index)}</span>
      <span class="prize-section__value">${currentPrize.payout}</span>
      <span class="prize-section__label">Odds</span>
      <span class="prize-section__value">${currentPrize.odds}</span>
    </div>
  </div>`);

  const prizesConstructor = prizes =>
    `<div class="prizes">
    ${prizes.reduce(prizeConstructor, "")}
  </div>`;

  const gridConstructor = (prevGrid, newGrid, index, array) =>
    (prevGrid += `<div class="odds-grid">
    ${titleConstructor(newGrid.title)}
    ${overallOddsConstructor(newGrid.overallOdds)}
    ${eventSizeConstructor(newGrid.eventSizeLabel, newGrid.eventSizeValue)}
    ${prizesConstructor(newGrid.prizes)}
  </div>
  `);

  const removeAllLineBreaks = string =>
    string
      .split("\n")
      .join("")
      .split("\r")
      .join("");

  const gridsConstructor = grids =>
    removeAllLineBreaks(grids.reduce(gridConstructor, ""));

  document.addEventListener("readystatechange", event => {
    if (document.readyState === "complete") {
      const grids = gridsConstructor(gridsData);
      document.querySelector("#odds-grids").innerHTML = grids;
    }
  });
})();
