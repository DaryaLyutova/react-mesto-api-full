/* eslint-disable no-useless-escape */
const CheckUrl = /^(https?:\/\/)?([\w\.\-]+)\.([a-z]{2,6}\.?)(\/[\w\.\-]*)*\/?$/gim;
const CheckUrlJoi = /^(https?:\/\/)?([\w\.\-]+)\.([a-z]{2,6}\.?)(\/[\w\.\-]*)*\/?$/;

module.exports = { CheckUrl, CheckUrlJoi };
