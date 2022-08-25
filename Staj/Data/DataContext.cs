using Microsoft.EntityFrameworkCore;

namespace Staj.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Location> LinqLocations { get; set; }

        public DataContext (DbContextOptions<DataContext>options) : base (options) { }
            
    }
}
