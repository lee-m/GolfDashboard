using GolfDashboard.Data;
using GolfDashboard.Data.Repositories;
using GolfDashboard.Interfaces;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace GolfDashboard.API
{
    public class Startup
    {
        private const string CORSPolicyName = "CORSPolicy";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddDbContext<GolfDashboardDbContext>(options => options.UseSqlite("name=ConnectionStrings:Default"));
            services.AddAutoMapper(GetType().Assembly);
            services.Configure<CORSOptions>(Configuration.GetSection(nameof(CORSOptions)));

            services.AddCors((options) =>
            {
                options.AddPolicy(CORSPolicyName, configure =>
                {
                    var opts = Configuration.GetSection(nameof(CORSOptions)).Get<CORSOptions>();

                    configure.WithOrigins(opts.AllowedOrigins)
                             .WithMethods(opts.Methods)
                             .WithHeaders(opts.Headers);
                });
            });

            services.AddScoped<INotesRepository, NotesRepository>();
            services.AddScoped<IGolfClubsRepository, GolfClubsRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, GolfDashboardDbContext databaseContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(CORSPolicyName);
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

            databaseContext.Database.Migrate();
        }
    }
}
