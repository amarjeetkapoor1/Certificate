<?php
header('Access-Control-Allow-Origin: *');
require_once('library/odf.php');

$content = trim(file_get_contents("php://input")); 
$obj = json_decode($content, true);

$base = $obj['id']; 				//Getting file name with filled Institute Details
$odf = new odf("odt/base/$base.odt");   		//Initializing the object with above file name
$id = uniqid();
$id = $id;				//To be used with filenames to differentiate simultaneous files being processed
// Assigning Form data to sesssion variables to be used in next step.

$sal = $obj['NameInitial'] ;
$fname = $obj['FirstName'] ;
$mname = $obj['MiddleName'] ;
$lname = $obj['LastName'] ;
$ins = $obj['Institution'];
$city = $obj['City'];
$state = $obj['State'] ;


$article = $odf->setSegment('articles');	//Defining Segment articles( used in .odt file)
	
		 //image

$article->pic(" ");
		//name
                 if($mname==NULL)
		         $article->nameArticle(" ".$name." ".$fname." ".$lname);
		else
                         $article->nameArticle(" ".$name." ".$fname." ".$mname." ".$lname); 
		
		//Institute/department
		if($city==NULL)
			$article->deptArticle($ins.", ".$state);
		else
			$article->deptArticle($ins.", ".$city);
	$article->merge();	

$odf->mergeSegment($article);

// We save the file 

# Final ODT file.
$source_file = "odt/cert/$id.odt";
//$odf -> saveToDisk("odt/cert/$id.odt"); //Saving the odt file to directory
$odf -> saveToDisk($source_file); //Saving the odt file to directory
//Convert the odt format to pdf

//$source_file = "odt/cert/$id.odt";
$output_file = "/pdf/$id.pdf";
$get_current_dir= getcwd();
//$command = 'sudo unoconv -f pdf --output /var/www/html/Certificate/CGS/pdf/'.$source_file;
$command = 'unoconv -o ' .$get_current_dir.'/pdf/'.$id.'.pdf -f pdf ' .$source_file;
#$command = '/usr/bin/unoconv -o '.$output_file.' -f pdf '.$source_file;
$result = shell_exec($command);
echo '{"odt":"odt/cert/'.$id.'.odt", "pdf":"pdf/'.$id.'.pdf"}'


?>
