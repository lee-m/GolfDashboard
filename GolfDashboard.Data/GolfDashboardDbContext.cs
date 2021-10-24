using GolfDashboard.Models;

using Microsoft.EntityFrameworkCore;

namespace GolfDashboard.Data
{
    public class GolfDashboardDbContext : DbContext
    {
        public GolfDashboardDbContext()
        { }

        public GolfDashboardDbContext(DbContextOptions<GolfDashboardDbContext> options) : base(options)
        { }

        public DbSet<GolfClub> GolfClubs { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<TeeBox> TeeBoxes { get; set; }
    }
}
