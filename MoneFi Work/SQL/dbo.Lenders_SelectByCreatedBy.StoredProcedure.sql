USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Lenders_SelectByCreatedBy]    Script Date: 6/6/2023 6:02:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Vincent Miller
-- Create date: 05/05/2023
-- Description: Select Lender By CreatedBy (Paginated)
-- Code Reviewer: None

-- MODIFIED BY: Vincent Miller
-- MODIFIED DATE: 05/05/2023
-- Code Reviewer: Cameron Johnson
-- Note: Initial creation.
-- =============================================



CREATE PROCEDURE [dbo].[Lenders_SelectByCreatedBy]
    @CreatedBy int,
    @PageIndex int,
    @PageSize int
AS

/*
EXEC [dbo].[Lenders_SelectByCreatedBy]
    @CreatedBy = 1,
    @PageIndex = 1,
    @PageSize = 10

*/
BEGIN
  

    SELECT 
        [L].[Id], 
        [L].[Name], 
        [LT].[Id] AS [LenderTypeId],
        [LT].[Name] AS [LenderTypeName],
        [LoT].[Id] AS [LoanTypeId], 
        [LoT].[Name] AS [LoanTypeName], 
        [ST].[Id] AS [StatusId],
        [ST].[Name] AS [StatusName], 
        (
            SELECT [Loc].[Id], 
                   [Loc].[LocationTypeId], 
                   [Loc].[LineOne], 
                   [Loc].[LineTwo], 
                   [Loc].[City], 
                   [Loc].[Zip], 
                   [Loc].[StateId], 
                   [Loc].[Latitude], 
                   [Loc].[Longitude], 
                   [Loc].[DateCreated], 
                   [Loc].[DateModified], 
                   [Loc].[CreatedBy], 
                   [Loc].[ModifiedBy], 
                   [Loc].[IsDeleted]
            FROM [dbo].[Locations] AS [Loc] 
            WHERE [Loc].[Id] = [L].[LocationId]
            FOR JSON PATH
        ) AS [Location],
        [L].[Logo], 
        [L].[Website], 
        [L].[StatusId], 
        [L].[DateCreated], 
        [L].[DateModified], 
        [L].[CreatedBy], 
        [L].[ModifiedBy],
        [TotalCount] = COUNT(1) OVER()
    FROM [dbo].[Lenders] AS [L]
    INNER JOIN [dbo].[LenderTypes] AS [LT]
        ON [L].[LenderTypeId] = [LT].[Id]
    INNER JOIN [dbo].[LoanTypes] AS [LoT]
        ON [L].[LoanTypeId] = [LoT].[Id]
    INNER JOIN [dbo].[StatusTypes] AS [ST]
        ON [L].[StatusId] = [ST].[Id]
    WHERE [L].[CreatedBy] = @CreatedBy
    ORDER BY [Id]
    OFFSET (@PageIndex - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END
GO
