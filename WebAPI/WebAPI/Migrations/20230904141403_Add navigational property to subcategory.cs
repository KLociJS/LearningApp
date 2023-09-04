using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class Addnavigationalpropertytosubcategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCategories_Categories_CategoryId",
                table: "SubCategories");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "SubCategories",
                newName: "CategoryID");

            migrationBuilder.RenameIndex(
                name: "IX_SubCategories_CategoryId",
                table: "SubCategories",
                newName: "IX_SubCategories_CategoryID");

            migrationBuilder.AlterColumn<Guid>(
                name: "CategoryID",
                table: "SubCategories",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategories_Categories_CategoryID",
                table: "SubCategories",
                column: "CategoryID",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCategories_Categories_CategoryID",
                table: "SubCategories");

            migrationBuilder.RenameColumn(
                name: "CategoryID",
                table: "SubCategories",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_SubCategories_CategoryID",
                table: "SubCategories",
                newName: "IX_SubCategories_CategoryId");

            migrationBuilder.AlterColumn<Guid>(
                name: "CategoryId",
                table: "SubCategories",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategories_Categories_CategoryId",
                table: "SubCategories",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");
        }
    }
}
