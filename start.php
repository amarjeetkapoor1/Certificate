<?php
header('Access-Control-Allow-Origin: *'); 
require_once('library/odf.php');   
$content = trim(file_get_contents("php://input")); 
$obj = json_decode($content, true);
$file=$obj['Sel'];
$odf = new odf("odt/design/$file.odt");



$insName = $obj['main']['InstitutionName'];
$aidedStatus =  $obj['main']['AidedStatus'];  
$insTagline =  $obj['main']['InstituteTagline'];
$affilliation =   $obj['main']['Affiliation'];
$event =  $obj['main']['Event'];
$topic = $obj['main']['Topic'];
$sign1 = $obj['main']['SignatureLeft'];
$sign2 = $obj['main']['Designation']; 
$sign3 = $obj['main']['SignatureMiddle'];
$des1 =  $obj['main']['Designtion'];
$des2 =  $obj['main']['SignatureRight'];
$des3 =  $obj['main']['Desigantion'];

//Setting the tags in odt file to be replaced by user filled data
$odf -> setvars('College',$insName);
$odf -> setvars('status',$aidedStatus);
$odf -> setvars('tagline',$insTagline);
$odf -> setvars('other',$affilliation);
$odf -> setvars('event',$event);
$odf -> setvars('topic',$topic);
$odf -> setvars('sign1',$sign1);
$odf -> setvars('sign2',$sign2);
$odf -> setvars('sign3',$sign3);
$odf -> setvars('d1',$des1);
$odf -> setvars('d2',$des2);
$odf -> setvars('d3',$des3);

$base = uniqid("base");
$_SESSION["base"] = $base;

$odf -> saveToDisk("odt/base/$base.odt"); //saving to Directory to be used in further steps

echo(json_encode($base))
?>

