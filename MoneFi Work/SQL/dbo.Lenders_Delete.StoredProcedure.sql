USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Lenders_Delete]    Script Date: 6/6/2023 6:02:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Vincent Miller
-- Create date: 05/05/2023
-- Description: Delete Lender (Update StatusId)
-- Code Reviewer: None

-- MODIFIED BY: Vincent Miller
-- MODIFIED DATE: 05/05/2023
-- Code Reviewer: Cameron Johnson
-- Note: Initial creation.
-- =============================================



CREATE PROCEDURE [dbo].[Lenders_Delete]
    @Id int,
    @ModifiedBy int
AS

/*
DECLARE @Id int = 4 -- Replace with the Id of the row to be updated
EXEC [dbo].[Lenders_Delete]
    @Id = @Id,
    @ModifiedBy = 3
	SELECT [Id], [Name], [LenderTypeId], [LoanTypeId], [Logo], [Website], [LocationId], [StatusId], [DateCreated], [DateModified], [CreatedBy], [ModifiedBy] 
    FROM [dbo].[Lenders]
    WHERE [Id] = @Id;


	The hardcoded value of "5" means "Removed" on the StatusId table
*/
BEGIN
    
    
    UPDATE [dbo].[Lenders] SET
        [StatusId] = 5,
        [ModifiedBy] = @ModifiedBy,
        [DateModified] = GETUTCDATE()
    WHERE [Id] = @Id;
	 
END
GO
