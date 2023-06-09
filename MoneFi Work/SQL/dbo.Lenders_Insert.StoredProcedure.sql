USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Lenders_Insert]    Script Date: 6/6/2023 6:02:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Vincent Miller
-- Create date: 05/05/2023
-- Description: Insert Lender
-- Code Reviewer: None

-- MODIFIED BY: Vincent Miller
-- MODIFIED DATE: 05/05/2023
-- Code Reviewer: Cameron Johnson
-- Note: Initial creation.
-- =============================================


CREATE PROCEDURE [dbo].[Lenders_Insert]
    @Name nvarchar(100),
	@Description nvarchar(500),
    @LenderTypeId int,
    @LoanTypeId int,
    @Logo nvarchar(255),
    @Website nvarchar(255),
    @LocationId int,
    @StatusId int,
    @CreatedBy int,
    @ModifiedBy int,
    @Id int OUTPUT
AS

/*
DECLARE @Id int
EXEC [dbo].[Lenders_Insert]
    @Name = 'Example Lender 10',
	@Description = 'Example Description',
    @LenderTypeId = 3,
    @LoanTypeId = 1,
    @Logo = "https://i.imgur.com/BueqT0w.jpeg",
    @Website = 'https://www.examplelender.com',
    @LocationId = 3,
    @StatusId = 1,
    @CreatedBy = 3,
    @ModifiedBy = 104,
    @Id = @Id OUTPUT

SELECT * FROM [dbo].[Lenders] WHERE [Id] = @Id
*/


BEGIN
    
    
    INSERT INTO [dbo].[Lenders]
           ([Name]
		   ,[Description]
           ,[LenderTypeId]
           ,[LoanTypeId]
           ,[Logo]
           ,[Website]
           ,[LocationId]
           ,[StatusId]
           ,[CreatedBy]
           ,[ModifiedBy])
     VALUES
           (@Name
		   ,@Description
           ,@LenderTypeId
           ,@LoanTypeId
           ,@Logo
           ,@Website
           ,@LocationId
           ,@StatusId
           ,@CreatedBy
           ,@ModifiedBy)

    SET @Id = SCOPE_IDENTITY();
END

GO
