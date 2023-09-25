using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace project.DataBase
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

    }
}
