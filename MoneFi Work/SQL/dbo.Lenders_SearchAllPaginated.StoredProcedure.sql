USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Lenders_SearchAllPaginated]    Script Date: 6/6/2023 6:02:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Vincent Miller
-- Create date: 05/11/2023
-- Description: Insert Lender
-- Code Reviewer: None

-- MODIFIED BY: Vincent Miller
-- MODIFIED DATE: 05/16/2023
-- Code Reviewer: 
-- Note: Changing the location return to remove subquery. and to add a join to return state Name.
-- =============================================
CREATE PROCEDURE [dbo].[Lenders_SearchAllPaginated]
    @PageIndex int,
    @PageSize int,
    @SearchTerm nvarchar(255) = null,
	@FilterTerm nvarchar(255) = null
AS


/*
EXEC [dbo].[Lenders_SearchAllPaginated]
    @PageIndex = 1,
    @PageSize = 100,
    @SearchTerm = Wells,
	@FilterTerm = Line 

	Select * From dbo.Lenders
*/
BEGIN
    SELECT 
        [L].[Id], 
        [L].[Name], 
		[L].[Description],
        [LT].[Id] AS [LenderTypeId],
        [LT].[Name] AS [LenderTypeName],
        [LoT].[Id] AS [LoanTypeId], 
        [LoT].[Name] AS [LoanTypeName], 
        [ST].[Id] AS [StatusId],
        [ST].[Name] AS [StatusName], 
        [Loc].[Id] AS [LocationId], 
        [Loc].[LocationTypeId], 
        [Loc].[LineOne], 
        [Loc].[LineTwo], 
        [Loc].[City], 
        [Loc].[Zip], 
        [S].[Name] AS [StateName], 
        [Loc].[Latitude], 
        [Loc].[Longitude], 
        [Loc].[DateCreated], 
        [Loc].[DateModified], 
        [Loc].[CreatedBy], 
        [Loc].[ModifiedBy], 
        [Loc].[IsDeleted] AS [LocationIsDeleted],
        [L].[Logo], 
        [L].[Website], 
        [L].[DateCreated], 
        [L].[DateModified], 
        [UC].Id, 
		UC.FirstName,
		UC.LastName,
		UC.Mi,
		UC.AvatarUrl,
        [UM].Id,
		UM.FirstName,
		UM.LastName,
		UM.Mi,
		UM.AvatarUrl,
        [TotalCount] = COUNT(1) OVER()
    FROM [dbo].[Lenders] AS [L]
    INNER JOIN [dbo].[LenderTypes] AS [LT]
        ON [L].[LenderTypeId] = [LT].[Id]
    INNER JOIN [dbo].[LoanTypes] AS [LoT]
        ON [L].[LoanTypeId] = [LoT].[Id]
    INNER JOIN [dbo].[StatusTypes] AS [ST]
        ON [L].[StatusId] = [ST].[Id]
    INNER JOIN [dbo].[Locations] AS [Loc]
        ON [Loc].[Id] = [L].[LocationId]
    INNER JOIN [dbo].[States] AS [S]
        ON [S].[Id] = [Loc].[StateId]
	INNER JOIN dbo.Users as UC
		ON L.CreatedBy = UC.Id
	INNER JOIN dbo.Users as UM
		ON L.ModifiedBy = UM.Id
    WHERE ((@SearchTerm IS NULL OR 
        [L].[Name] LIKE '%' + @SearchTerm + '%' OR
        [LoT].[Name] LIKE '%' + @SearchTerm + '%' OR 
        [LT].[Name] LIKE '%' + @SearchTerm + '%')
    AND 
    (@FilterTerm IS NULL OR 
        [LoT].[Name] LIKE '%' + @FilterTerm + '%' OR 
        [LT].[Name] LIKE '%' + @FilterTerm + '%'))

    ORDER BY [L].[DateCreated] DESC
    OFFSET (@PageIndex - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END
GO
