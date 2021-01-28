/* eslint-disable no-useless-escape */
const CheckUrl = /https?\:\/\/w?w?w?(\w*([\.\-\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=])*)*\#?/gim;
const CheckUrlJoi = /https?\:\/\/w?w?w?(\w*([\.\-\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=])*)*\#?/;

module.exports = { CheckUrl, CheckUrlJoi };
