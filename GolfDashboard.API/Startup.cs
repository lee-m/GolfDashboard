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
            services.AddDbContext<GolfDashboardDbContext>(options => options.UseSqlServer("name=ConnectionStrings:DefaultConnection"));
            services.AddAutoMapper(GetType().Assembly);

            services.AddCors((options) =>
            {
                options.AddPolicy(CORSPolicyName, configure =>
                {
                    configure.WithOrigins("https://localhost:3000", "http://localhost:3000")
                             .WithMethods("GET", "POST", "DELETE")
                             .WithHeaders("Content-Type");
                });
            });

            services.AddScoped<INotesRepository, NotesRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(CORSPolicyName);
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
