using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class Addreportdata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticleReports_Articles_ReportedArticleId",
                table: "ArticleReports");

            migrationBuilder.AlterColumn<Guid>(
                name: "ReportedArticleId",
                table: "ArticleReports",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "ArticleTakeDownNotices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: false),
                    Reason = table.Column<int>(type: "integer", nullable: false),
                    Details = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArticleTakeDownNotices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArticleTakeDownNotices_AspNetUsers_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArticleTakeDownNotices_AuthorId",
                table: "ArticleTakeDownNotices",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ArticleReports_Articles_ReportedArticleId",
                table: "ArticleReports",
                column: "ReportedArticleId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticleReports_Articles_ReportedArticleId",
                table: "ArticleReports");

            migrationBuilder.DropTable(
                name: "ArticleTakeDownNotices");

            migrationBuilder.AlterColumn<Guid>(
                name: "ReportedArticleId",
                table: "ArticleReports",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_ArticleReports_Articles_ReportedArticleId",
                table: "ArticleReports",
                column: "ReportedArticleId",
                principalTable: "Articles",
                principalColumn: "Id");
        }
    }
}
