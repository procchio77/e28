# Web API 3.1 with MySql (managed)

##### Pubication Date 05/07/20 by Patrick Monserratt

## Introduction

This tutorial will show you how to:

1.  Setup a managed MySql database on [DigitalOcean](https://www.digitalocean.com/)
2.  Build a ASP.NET Core 3.1 Web API application with [Visual Studio Code](https://code.visualstudio.com/).
3.  Use [Entity Framework Core 3.0](https://docs.microsoft.com/en-us/ef/core/what-is-new/ef-core-3.0/) for data access and scaffolding C# classes to your managed MySQL database (code first approach).

I will try and keep the tutorial sweet and simple, with the goal being trying to get you up and running with a solution. I will provide links to help you dive deeper into each topic at the end of this post.

## Prerequisites

Before we begin, you will need to make sure you have the following:

1. Install [Visual Studio Code](https://code.visualstudio.com/)
2. Create an account on [DigitalOcean](https://www.digitalocean.com/)
3. Download and install [.Net Core 3.1 SDK](https://dotnet.microsoft.com/download)

## MySql Database Setup

Instead of downloading a MySql database to our local environment and worrying about all the configuration we will rely on a managed version of MySql offered as a service by [DigitalOcean](https://www.digitalocean.com/).

### Create Project and database

1.  [Sign in](https://cloud.digitalocean.com/login) to your DigitalOcean account.
2.  Create a **New Project** if you do not have one.
    - Give it a name (I named my WMD-Tutorial)
    - Enter in a project description.
    - Select purpose (I choose Class Project / Educational Purposes)
3.  Click **Create a Managed Database** under the **Create Something new** heading.
4.  Select **MySQL** as your database engine.
5.  Select an appropriate **Node Plan**. I choose the \$15/month plan for the purpose of this tutorial.
6.  Choose a **datacenter** that is closest to your location (I chose New York)
7.  Choose a unique database cluster name (I left the default name)
8.  **Select Project** - select the project you created in step 2 or another one you want this database attached to.
9.  Click **Create a Database Cluster**

> Your database will take about 5 minutes to be provisioned. In the meantime, we can secure and configure our database.

### Secure and Configure Database Cluster

#### Restrict inbound connections

1.  I restricted trusted sources to my ip address
    > Typically, you would only allow an application/web server to connect to the cluster, but for this tutorial I have restricted it by my local IP address, since I will not be deploying the application to another server, I will interact with the database from my local computer.

```
Warning: depending on your
network setup it is highly
possible your IP address is dynamic (can change).
```

2.  Keep the default configuration for the remaining steps.
3.  At this point you should be presented with your connection info in two formats- **Connection string** and **connection parameters**. We will need this info in our API application to interact with our database.
    > You can copy the connection parameter info into a text editor or come back later to copy it. Your connection info can be found by clicking on your **Project** > **Database Cluster Name** in your [DigitalOcean](https://www.digitalocean.com/) account.
    >
    > **Tip:** You can download a MySql client like [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
    > to test your connection and manage your database.

## NET Core 3.1 Web API application

To keep it simple - we are going to be building our API using one **Zoo** object.

1.  Open a command window and navigate to a directory where you want to create the project.
2.  Type `dotnet new webapi -o ZooApiProject`
3.
4.  Create a folder called **ZooApiProject** anywhere you like on your filesystem.
5.  Open Visual Studio Code and open the folder you just created.
6.  Open a new **Terminal** window in VSCode
7.  Type `dotnet new webapi -o ZooApiProject` and hit return.
8.  Click `F5` to Run your project. This will add any packages you need to run/build your project. Also, if you are prompted to add an extension (i.e. C# Extension) just click yes.

> **Tip:** the project already comes with a working WeatherForecast API. You can type in dotnet run in your terminal. You should get info on what the listening url is. To reach the api response, append weatherforecast to url, like so: [https://localhost:5001/weatherforecast](https://localhost:5001/weatherforecast)

**Additional Packages to Install**

In the terminal add the following packages by typing:

1.  `dotnet add package Microsoft.EntityFrameworkCore --version 3.1.3`
2.  `dotnet tool install --global dotnet-ef`
3.  `dotnet add package Microsoft.EntityFrameworkCore.Design`

These are the EntityFrameworkCore packages needed to connect and manage your database with our code first approach.

### Model-View-Controller (MVC) Pattern

This project uses the MVC Pattern.

1.  A _Model_ which represents the underlying, logical structure of data in a software application and the high-level class associated with it.
2.  A _View_ is a collection of classes representing the elements in the user interface (all of the things the user can see and respond to on the screen
3.  A _Controller_ represents the classes connecting the model and the view, it is used to communicate between classes in the model and view.

**_Lets's add a zoo model_**

1.  Create a Models folder in your project.
2.  Add a new file called Zoo.cs and add in the following code

```
namespace  ZooApiProject.Models
{
	public  class  Zoo
	{
		public  int  ZooId  {get;set;}
		public  string  ZooName  {get;set;}
		public  string  City  {  get;  set;  }
		public  string  State  {  get;  set;  }
	}
}
```

3. Add a new file called ZooContext.cs and add in the following code

```
using  Microsoft.EntityFrameworkCore;

namespace  ZooApiProject.Models
{
	public  class  ZooContext  :  DbContext
	{
		public  ZooContext(DbContextOptions  options)  :  base(options)
		{
		}

		public  DbSet<Zoo>  Zoos  {get;set;}
	}
}
```

--DbContext is a class provided by Entity Framework to establish connection to **database**, query the **db** and close connection

### Configuration for Database and migrations

Use the following format for your connection string:
`"server={host};port={port};Uid={username};pwd={password}database={database};SslMode=required;"`

1.  Create a ConnectionStrings entry in your appsettings.json file like so:

```
"ConnectionStrings":  {
"DefaultConnection":  "server=db-mysql-nyc1-11616-do-user70-.a.db.ondigitalocean.com;port=25060;Uid=doadmin;pwd=1234;database=defaultdb;SslMode=required;"
},
```

2. In your Startup.cs file add the following using statements.

```
using  ZooApiProject.Models;
using  Microsoft.EntityFrameworkCore;
```

also add the following to your
public void ConfigureServices(IServiceCollection services) method

```
string  connectionString  =  Configuration.GetConnectionString("DefaultConnection");
services.AddDbContext<ZooContext>(opt  =>  opt.UseMySQL(connectionString));
```

### Push migrations to database

1. run the following commands in your terminal
   `dotnet ef migrations add InitialCreate`
   `dotnet ef database update`

\*You might get an error Table 'defaultdb.\_\_EFMigrationsHistory' doesn't exist' If you do you can have to create the table in the Mysql. Use the following script.

```
CREATE TABLE `__EFMigrationsHistory` ( `MigrationId` nvarchar(150) NOT NULL, `ProductVersion` nvarchar(32) NOT NULL, PRIMARY KEY (`MigrationId`) );
```

### Add ZooController

1. In the Controllers folder add a file called ZooController.cs with the following code.

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ZooApiProject.Models;

namespace ZooApiProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ZooController : ControllerBase
    {

       private ZooContext _zooContext;

       public ZooController(ZooContext context)
       {
           _zooContext = context;

       }

       //GET api/values
       [HttpGet]
        public ActionResult<IEnumerable<Zoo>> Get()
        {
            return _zooContext.Zoos.ToList();
        }

        ~ZooController()
        {
            _zooContext.Dispose();
        }
    }
}
```

For the purpose of the tutorial, I only added a Get method that returns all Zoo data from the database. At this time the database has no records. You can add some data then build your project.

1. Add some data to the database.
2. In terminal type: dotnet run
3. navigate to your api based on the route.

## Sources

[Tutorial: Create a web API with ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-3.1&tabs=visual-studio)

[Getting Started with EF Core](https://docs.microsoft.com/en-us/ef/core/get-started/?tabs=netcore-cli)

[DigitalOcean - MySQL Documentation](https://www.digitalocean.com/docs/databases/mysql/)

[How to use Entity Framework 2.0 with .NET Core and MySQL](https://www.youtube.com/watch?v=bUAtYKE6ZPM)
