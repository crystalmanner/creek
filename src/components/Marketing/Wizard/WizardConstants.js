export const SUBSTEP_COMPLETED = "substep-completed";
export const SUBSTEP_INCOMPLETED = "substep-incompleted";

export const _Days = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
];
export const _Months = [
  { label: "Jan", value: 1 },
  { label: "Feb", value: 2 },
  { label: "Mar", value: 3 },
  { label: "Apr", value: 4 },
  { label: "May", value: 5 },
  { label: "Jun", value: 6 },
  { label: "Jul", value: 7 },
  { label: "Aug", value: 8 },
  { label: "Sep", value: 9 },
  { label: "Oct", value: 10 },
  { label: "Nov", value: 11 },
  { label: "Dec", value: 12 },
];
export const _MidMonths = [
  { label: "Jan", value: 1 },
  { label: "Mar", value: 3 },
  { label: "Apr", value: 4 },
  { label: "May", value: 5 },
  { label: "Jun", value: 6 },
  { label: "Jul", value: 7 },
  { label: "Aug", value: 8 },
  { label: "Sep", value: 9 },
  { label: "Oct", value: 10 },
  { label: "Nov", value: 11 },
  { label: "Dec", value: 12 },
];
export const _LongMonths = [
  { label: "Jan", value: 1 },
  { label: "Mar", value: 3 },
  { label: "May", value: 5 },
  { label: "Jul", value: 7 },
  { label: "Aug", value: 8 },
  { label: "Oct", value: 10 },
  { label: "Dec", value: 12 },
];
export const _Years = [
  2021,
  2022,
  2023,
  2024,
  2025,
  2026,
  2027,
  2028,
  2029,
  2030,
  2031,
  2032,
  2033,
  2034,
  2035,
];

export const _HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const _Minutes = [
  { value: 0, label: ":00" },
  { value: 5, label: ":05" },
  { value: 10, label: ":10" },
  { value: 15, label: ":15" },
  { value: 20, label: ":20" },
  { value: 25, label: ":25" },
  { value: 30, label: ":30" },
  { value: 35, label: ":35" },
  { value: 40, label: ":40" },
  { value: 45, label: ":45" },
  { value: 50, label: ":50" },
  { value: 55, label: ":55" },
];

export const _Prices = {
  email: 0.25,
  text: 0.25,
  ringlessVoicemail: 0.25,
  postcard: 1.25,
  socialPost: 0.5,
};

export const _Substeps = [
  {
    step: "email",
    label: "Automated Email",
    price: _Prices.email,
    other: "An Automated Email sent to your prospects",
    items: "",
  },
  {
    step: "text",
    label: "Automated Text",
    price: _Prices.text,
    other: "An Automated Text sent to your prospects",
    items: "",
  },
  {
    step: "ringlessVoicemail",
    label: "Automated Ringless Voicemail",
    price: _Prices.ringlessVoicemail,
    other:
      "Upload an mp3/mp4 file of the voicemail recording that you would like to send.",
    items: "",
  },
  // {
  //   step: "postcard",
  //   label: "Automated Post Card",
  //   price: _Prices.postcard,
  //   other:
  //     "Upload an mp3/mp4 file of the voicemail recording that you would like to send.",
  //   items: "4x6 ",
  // },
  // {
  //   step: "socialPost",
  //   label: "Automated Facebook/Instagram Post",
  //   price: 0.5,
  //   other: "",
  //   items: "",
  // },
];
