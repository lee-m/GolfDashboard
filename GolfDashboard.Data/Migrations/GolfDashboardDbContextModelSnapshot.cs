﻿// <auto-generated />
using GolfDashboard.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GolfDashboard.Data.Migrations
{
    [DbContext(typeof(GolfDashboardDbContext))]
    partial class GolfDashboardDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.5");

            modelBuilder.Entity("GolfDashboard.Models.GolfClub", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .HasColumnType("TEXT");

                    b.Property<int>("DisplaySequence")
                        .HasColumnType("INTEGER");

                    b.Property<double>("Latitude")
                        .HasColumnType("REAL");

                    b.Property<double>("Longitude")
                        .HasColumnType("REAL");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Website")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("GolfClubs");
                });

            modelBuilder.Entity("GolfDashboard.Models.Note", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("Notes");
                });

            modelBuilder.Entity("GolfDashboard.Models.Tag", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Text")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("NoteTag", b =>
                {
                    b.Property<int>("NotesID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TagsID")
                        .HasColumnType("INTEGER");

                    b.HasKey("NotesID", "TagsID");

                    b.HasIndex("TagsID");

                    b.ToTable("NoteTag");
                });

            modelBuilder.Entity("NoteTag", b =>
                {
                    b.HasOne("GolfDashboard.Models.Note", null)
                        .WithMany()
                        .HasForeignKey("NotesID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GolfDashboard.Models.Tag", null)
                        .WithMany()
                        .HasForeignKey("TagsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
