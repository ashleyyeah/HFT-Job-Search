<!-----

You have some errors, warnings, or alerts. If you are using reckless mode, turn it off to see inline alerts.
* ERRORs: 0
* WARNINGs: 0
* ALERTS: 4

Conversion time: 2.755 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β33
* Sun Mar 27 2022 13:17:19 GMT-0700 (PDT)
* Source doc: Project Documentation
* Tables are currently converted to HTML tables.
* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server. NOTE: Images in exported zip file from Google Docs may not appear in  the same order as they do in your doc. Please check the images!

----->


<p style="color: red; font-weight: bold">>>>>>  gd2md-html alert:  ERRORs: 0; WARNINGs: 0; ALERTS: 4.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>>  gd2md-html alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p><a href="#gdcalert1">alert1</a>
<a href="#gdcalert2">alert2</a>
<a href="#gdcalert3">alert3</a>
<a href="#gdcalert4">alert4</a>

<p style="color: red; font-weight: bold">>>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>


**Design Document**

<span style="text-decoration:underline;">Title:</span> HFT Company Database

<span style="text-decoration:underline;">Project Summary</span>

**	**In this project, we aim to create a database that contains useful information about job positions in high frequency trading firms, including available positions, salary range for each position based in each city, desirable skills, and how frequently each skill is demanded. The database will also contain information about each company, such as its address. After acquiring all this information, we plan to perform some data analysis, such as what is the marginal $ for each skill, up-coming trends of which companies are aggressively hiring, and comparisons on which companies may fit the conditions the users have set . We plan to display the result in a web GUI.

<span style="text-decoration:underline;">Technologies</span>

Frontend: React/JS

Backend: Python

Database: MySQL - server hosted on vm

<span style="text-decoration:underline;">Software/Libraries</span>



* Vagrant 2.2.19
* VirtualBox 6.1
* MySQL Community Server 8.0.28
* SQLAlchemy 1.4.32
* Flask

<span style="text-decoration:underline;">Diagram of how frontend backend and database communicates</span>



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.jpg "image_tooltip")


<span style="text-decoration:underline;">Usefulness</span>

	This database will allow end users to be able to use a website to search through high frequency trading firms and filter job positions based on different criteria useful to the user. It can be very useful to those searching for the job to see how their own interests and skills match those of the company.

<span style="text-decoration:underline;">Data Sources:</span>

	<span style="text-decoration:underline;">Databases</span>:

	SEC: [Company Information About Active Broker-Dealers](https://www.sec.gov/help/foiadocsbdfoiahtm.html)

H1B: [H-1B Employer Data Hub Files](https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub/h-1b-employer-data-hub-files) 

CME: [List of Clearing Firms](https://www.cmegroup.com/clearing/financial-and-regulatory-surveillance/clearing-firms.html)

FCC: [List of Databases for FCC registrations](https://www.fcc.gov/licensing-databases/search-fcc-databases)

	<span style="text-decoration:underline;">APIs</span>:

	Indeed: [Indeed Job Description Scraper](https://github.com/UmaisZahid/Indeed-Job-Scraper) 

	Google Jobs: [Jobs Listings from Google Jobs | SerpApi](https://medium.com/serpapi/how-to-scrape-jobs-listings-from-google-jobs-4759bc44bfe9) 

	Glassdoor: [Glassdoor Companies Search](https://www.glassdoor.com/developer/companiesApiActions.htm)

	

<span style="text-decoration:underline;">Tools</span>

	<span style="text-decoration:underline;">APIs:</span>


<table>
  <tr>
   <td><strong> Name & Embedded Link</strong>
   </td>
   <td><strong>Usefulness</strong>
   </td>
  </tr>
  <tr>
   <td>OpenCorporate
<p>
<a href="https://api.opencorporates.com/documentation/Open-Refine-Reconciliation-API">Open Refine Reconciliation API: version 0.4.8</a><span style="text-decoration:underline;"> </span>
   </td>
   <td>Company name normalization
   </td>
  </tr>
  <tr>
   <td>USPS Address APIs
<p>
<a href="https://www.usps.com/business/web-tools-apis/address-information-api.htm#_Toc39492052">Address Validation API</a> 
   </td>
   <td>Address normalization
   </td>
  </tr>
  <tr>
   <td>Workforce Initiative Skills API
<p>
<a href="https://github.com/workforce-data-initiative/skills-api/wiki/API-Overview?ref=public-apis#introduction">Open Skills API</a> 
   </td>
   <td>Normalizing job description skills
   </td>
  </tr>
  <tr>
   <td>Github Web Scraping API
<p>
<a href="https://github.com/configtheworld/web-scraping-jobs-api">Github Web Scraping API implementation</a>
   </td>
   <td>General Web Data scraping
   </td>
  </tr>
</table>


<span style="text-decoration:underline;">Rough Idea of the Columns in our Databases</span>



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")


<span style="text-decoration:underline;">Rough UI</span>



<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image3.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image3.jpg "image_tooltip")


<span style="text-decoration:underline;">Reference Lists</span>

<span style="text-decoration:underline;">potential projects </span>

Indeed Job Scraper - [Link](https://github.com/UmaisZahid/Indeed-Job-Scraper)


    <span style="text-decoration:underline;">Articles</span>


    Build a Job Database using Indeed’s API - [Link](https://medium.com/@alberto_moura/build-a-jobs-database-using-indeeds-api-8f95316be842)


    How to Scrape Job Listing from Google Jobs - [Link](https://medium.com/serpapi/how-to-scrape-jobs-listings-from-google-jobs-4759bc44bfe9)


    How to Scrape Job Listing from Glassdoor - [Link](https://mersakarya.medium.com/selenium-tutorial-scraping-glassdoor-com-in-10-minutes-3d0915c6d905)


    A Complete Guide to Web Scraping LinkedIn Job Postings - [Link](https://maoviola.medium.com/a-complete-guide-to-web-scraping-linkedin-job-postings-ad290fcaa97f)


    Javascript/React Tutorial via Khan Academy - [Link](https://www.khanacademy.org/computing/computer-programming/html-css-js)


    Web Scraping with Beautiful Soup - [Link](https://stackabuse.com/guide-to-parsing-html-with-beautifulsoup-in-python/)

**	**React FrontEnd +  Python Flask backend Tutorial - [Link ](https://www.youtube.com/watch?v=msEmUtYqVV0)

<span style="text-decoration:underline;">General Project Email</span>

	We will be using a dummy email to request and access API’s for the entirety of the project. This is so that everyone is able to access the API correctly through the same means.

	Email: [hft498group6@gmail.com](mailto:hft498group6@gmail.com)

**<span style="text-decoration:underline;">Project Timeline:</span>**



<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image4.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image4.png "image_tooltip")

